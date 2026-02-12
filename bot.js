const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  Events,
  REST,
  Routes,
  SlashCommandBuilder,
  InteractionType
} = require('discord.js');
const knowledgeBase = require('./knowledge-base.json');

// --- Configuration ---
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = '1452323701235388498';
const GENERAL_CATEGORY_ID = '1454147673090162859';

if (!BOT_TOKEN) {
  console.error('ERROR: DISCORD_BOT_TOKEN environment variable is not set.');
  process.exit(1);
}

// --- Keyword-based Q&A Engine ---

const qaEntries = buildQAEntries();

function buildQAEntries() {
  const entries = [];

  for (const item of knowledgeBase.faq) {
    entries.push({
      question: item.question,
      answer: item.answer,
      keywords: extractKeywords(item.question + ' ' + item.answer)
    });
  }

  entries.push({
    question: 'Tell me about LovHack',
    answer: knowledgeBase.event_info.description,
    keywords: ['lovhack', 'about', 'what', 'hackathon', 'info', 'information', 'tell', 'overview', 'summary']
  });

  entries.push({
    question: 'When is LovHack?',
    answer: `LovHack 2026 ran from ${knowledgeBase.dates.start} to ${knowledgeBase.dates.end} (${knowledgeBase.dates.duration}). ${knowledgeBase.dates.status}.`,
    keywords: ['when', 'date', 'dates', 'time', 'schedule', 'start', 'end', 'duration', 'long']
  });

  entries.push({
    question: 'What are the prizes?',
    answer: knowledgeBase.prizes.description,
    keywords: ['prize', 'prizes', 'win', 'reward', 'rewards', 'winning', 'award', 'awards', 'credits']
  });

  entries.push({
    question: 'How are projects judged?',
    answer: `Projects are judged on: ${knowledgeBase.judging_criteria.criteria.join(', ')}. ${knowledgeBase.judging_criteria.description}`,
    keywords: ['judge', 'judging', 'criteria', 'evaluated', 'score', 'scoring', 'graded', 'judged']
  });

  entries.push({
    question: 'Format and cost',
    answer: `**Format:** ${knowledgeBase.format.type}\n**Cost:** ${knowledgeBase.format.cost}\n**Teams:** ${knowledgeBase.format.team_options}\n**Experience:** ${knowledgeBase.format.experience_level}\n**Participants:** ${knowledgeBase.format.total_registered}`,
    keywords: ['format', 'cost', 'price', 'free', 'money', 'pay', 'fee', 'online', 'virtual', 'person']
  });

  entries.push({
    question: 'Community links',
    answer: `**Discord:** ${knowledgeBase.community.discord}\n**Twitter:** ${knowledgeBase.community.twitter}\n**Organizer:** ${knowledgeBase.community.organizer}`,
    keywords: ['community', 'discord', 'twitter', 'social', 'contact', 'organizer', 'reach', 'link', 'links', 'join']
  });

  entries.push({
    question: 'Registration info',
    answer: `Registration was through the Luma event page (${knowledgeBase.event_info.luma_page}) and the official website (${knowledgeBase.event_info.website}). The event had ${knowledgeBase.format.total_registered} registered participants. The event has already concluded.`,
    keywords: ['register', 'registration', 'sign', 'signup', 'apply', 'join', 'participate', 'enroll', 'how']
  });

  entries.push({
    question: 'Team or Solo?',
    answer: knowledgeBase.format.team_options + '. ' + knowledgeBase.format.experience_level + '.',
    keywords: ['team', 'solo', 'alone', 'group', 'partner', 'teammates', 'size', 'members']
  });

  entries.push({
    question: 'Website',
    answer: `The official LovHack website is ${knowledgeBase.event_info.website}`,
    keywords: ['website', 'site', 'url', 'web', 'link', 'page', 'homepage']
  });

  return entries;
}

function extractKeywords(text) {
  const stopWords = new Set([
    'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'shall', 'can', 'to', 'of', 'in', 'for',
    'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'during',
    'before', 'after', 'above', 'below', 'between', 'out', 'off', 'over',
    'under', 'again', 'further', 'then', 'once', 'here', 'there', 'all',
    'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some',
    'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than',
    'too', 'very', 'just', 'it', 'its', 'and', 'but', 'or', 'if', 'this',
    'that', 'these', 'those', 'i', 'me', 'my', 'we', 'our', 'you', 'your',
    'he', 'him', 'his', 'she', 'her', 'they', 'them', 'their', 'am'
  ]);

  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 1 && !stopWords.has(word));
}

function findBestAnswer(userQuestion) {
  const userKeywords = extractKeywords(userQuestion);
  if (userKeywords.length === 0) return null;

  let bestMatch = null;
  let bestScore = 0;

  for (const entry of qaEntries) {
    let score = 0;
    const entryKeywords = new Set(entry.keywords);

    for (const keyword of userKeywords) {
      if (entryKeywords.has(keyword)) {
        score += 3;
        continue;
      }
      for (const ek of entryKeywords) {
        if (ek.includes(keyword) || keyword.includes(ek)) {
          score += 1.5;
          break;
        }
      }
    }

    const normalizedScore = score / userKeywords.length;

    if (normalizedScore > bestScore) {
      bestScore = normalizedScore;
      bestMatch = entry;
    }
  }

  if (bestScore < 1.0) return null;
  return bestMatch;
}

// --- Register Slash Commands ---

async function registerCommands() {
  const commands = [
    new SlashCommandBuilder()
      .setName('ask')
      .setDescription('Ask a question about LovHack hackathon')
      .addStringOption(option =>
        option.setName('question')
          .setDescription('Your question about LovHack')
          .setRequired(true)
      ),
    new SlashCommandBuilder()
      .setName('lovhack')
      .setDescription('Get general info about LovHack 2026'),
    new SlashCommandBuilder()
      .setName('faq')
      .setDescription('See frequently asked questions about LovHack'),
  ].map(cmd => cmd.toJSON());

  const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

  try {
    const appUser = await rest.get(Routes.user());
    const appId = appUser.id;
    console.log(`Bot application ID: ${appId}`);
    console.log('Registering slash commands...');

    // Try guild-specific commands first (instant), fall back to global (takes ~1hr)
    try {
      await rest.put(
        Routes.applicationGuildCommands(appId, GUILD_ID),
        { body: commands }
      );
      console.log('Guild slash commands registered successfully!');
    } catch (guildErr) {
      console.log('Guild command registration failed (bot may need re-invite with applications.commands scope).');
      console.log('Registering global commands instead (may take up to 1 hour to appear)...');
      await rest.put(
        Routes.applicationCommands(appId),
        { body: commands }
      );
      console.log('Global slash commands registered successfully!');
    }
  } catch (err) {
    console.error('Failed to register slash commands:', err.message);
  }
}

// --- Discord Bot Setup ---

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ]
});

client.once(Events.ClientReady, async (c) => {
  console.log(`Bot is online as ${c.user.tag}`);
  console.log(`Monitoring guild: ${GUILD_ID}`);
  console.log(`General category: ${GENERAL_CATEGORY_ID}`);
  await registerCommands();
});

// Handle slash commands
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  console.log(`Received command: /${commandName} from ${interaction.user.tag} in guild ${interaction.guildId}`);

  try {
    if (commandName === 'ask') {
      const question = interaction.options.getString('question');
      const match = findBestAnswer(question);

      if (match) {
        const embed = new EmbedBuilder()
          .setColor(0xE91E63)
          .setTitle('LovHack Support')
          .addFields({ name: 'Your Question', value: question })
          .setDescription(match.answer)
          .setFooter({ text: 'LovHack 2026 | lovhack.dev' })
          .setTimestamp();

        await interaction.reply({ embeds: [embed] });
      } else {
        const fallbackEmbed = new EmbedBuilder()
          .setColor(0xFF9800)
          .setTitle('LovHack Support')
          .addFields({ name: 'Your Question', value: question })
          .setDescription(
            "I don't have a specific answer for that question, but here are some helpful resources:\n\n" +
            `**Website:** ${knowledgeBase.event_info.website}\n` +
            `**Discord:** ${knowledgeBase.community.discord}\n` +
            `**Twitter:** ${knowledgeBase.community.twitter}\n\n` +
            "Try asking about: dates, prizes, judging criteria, registration, teams, format, or general info about LovHack!"
          )
          .setFooter({ text: 'LovHack 2026 | lovhack.dev' })
          .setTimestamp();

        await interaction.reply({ embeds: [fallbackEmbed] });
      }
    } else if (commandName === 'lovhack') {
      const embed = new EmbedBuilder()
        .setColor(0xE91E63)
        .setTitle('LovHack 2026')
        .setDescription(knowledgeBase.event_info.description)
        .addFields(
          { name: 'Dates', value: `${knowledgeBase.dates.start} - ${knowledgeBase.dates.end}`, inline: true },
          { name: 'Duration', value: knowledgeBase.dates.duration, inline: true },
          { name: 'Format', value: knowledgeBase.format.type, inline: true },
          { name: 'Cost', value: knowledgeBase.format.cost, inline: true },
          { name: 'Teams', value: knowledgeBase.format.team_options, inline: true },
          { name: 'Participants', value: knowledgeBase.format.total_registered, inline: true },
          { name: 'Judging Criteria', value: knowledgeBase.judging_criteria.criteria.join(', ') },
          { name: 'Prizes', value: knowledgeBase.prizes.description },
          { name: 'Website', value: knowledgeBase.event_info.website, inline: true },
          { name: 'Twitter', value: knowledgeBase.community.twitter, inline: true },
        )
        .setFooter({ text: knowledgeBase.event_info.motto })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } else if (commandName === 'faq') {
      const faqItems = knowledgeBase.faq.slice(0, 10);
      const faqText = faqItems.map((item, i) =>
        `**${i + 1}. ${item.question}**\n${item.answer}`
      ).join('\n\n');

      const embed = new EmbedBuilder()
        .setColor(0xE91E63)
        .setTitle('LovHack 2026 - FAQ')
        .setDescription(faqText.slice(0, 4000))
        .setFooter({ text: 'Use /ask <question> for specific questions | lovhack.dev' })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    }
  } catch (err) {
    console.error('Error handling interaction:', err);
    try {
      const errorMsg = { content: 'Something went wrong. Please try again!', ephemeral: true };
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(errorMsg);
      } else {
        await interaction.reply(errorMsg);
      }
    } catch (e) {
      console.error('Failed to send error response:', e.message);
    }
  }
});

// Also handle messages where the bot is mentioned (works without MessageContent intent)
client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  if (message.guild?.id !== GUILD_ID) return;

  // Check if bot is mentioned
  if (!message.mentions.has(client.user)) return;

  // Strip the mention to get the actual question
  const content = message.content
    .replace(/<@!?\d+>/g, '')
    .trim();

  if (!content) {
    const helpEmbed = new EmbedBuilder()
      .setColor(0xE91E63)
      .setTitle('LovHack Support Bot')
      .setDescription(
        "Hi! I can answer questions about LovHack 2026. Here's how to use me:\n\n" +
        "**Slash Commands:**\n" +
        "`/ask <question>` - Ask any question about LovHack\n" +
        "`/lovhack` - Get a full overview of LovHack 2026\n" +
        "`/faq` - See frequently asked questions\n\n" +
        "**Mention me:**\n" +
        "You can also @mention me with your question!"
      )
      .setFooter({ text: 'LovHack 2026 | lovhack.dev' })
      .setTimestamp();

    await message.reply({ embeds: [helpEmbed] });
    return;
  }

  try {
    const match = findBestAnswer(content);

    if (match) {
      const embed = new EmbedBuilder()
        .setColor(0xE91E63)
        .setTitle('LovHack Support')
        .setDescription(match.answer)
        .setFooter({ text: 'LovHack 2026 | lovhack.dev' })
        .setTimestamp();

      await message.reply({ embeds: [embed] });
    } else {
      const fallbackEmbed = new EmbedBuilder()
        .setColor(0xFF9800)
        .setTitle('LovHack Support')
        .setDescription(
          "I don't have a specific answer for that, but here are some helpful resources:\n\n" +
          `**Website:** ${knowledgeBase.event_info.website}\n` +
          `**Discord:** ${knowledgeBase.community.discord}\n` +
          `**Twitter:** ${knowledgeBase.community.twitter}\n\n` +
          "Try asking about: dates, prizes, judging, registration, teams, format, or general info!"
        )
        .setFooter({ text: 'LovHack 2026 | lovhack.dev' })
        .setTimestamp();

      await message.reply({ embeds: [fallbackEmbed] });
    }
  } catch (err) {
    console.error('Error responding to mention:', err);
  }
});

// --- Start the bot ---
client.login(BOT_TOKEN)
  .then(() => console.log('Login successful'))
  .catch(err => {
    console.error('Failed to login:', err.message);
    process.exit(1);
  });
