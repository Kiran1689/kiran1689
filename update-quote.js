const fs = require('fs');

async function updateQuote() {
  try {
    const quotes = require('./quotes.json');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const { quote, author } = quotes[randomIndex];

    const cardDesign = `
    <p align="center">
      <!--STARTS_HERE_QUOTE_CARD-->
      <img src="https://readmedailyquotes.vercel.app/api?author=${encodeURIComponent(author)}&quote=${encodeURIComponent(quote)}&theme=dark&bg_color=011627&author_color=ffeb95">
      <!--ENDS_HERE_QUOTE_CARD-->
    </p>
    `;

    const readmePath = './README.md';
    let readmeContent = fs.readFileSync(readmePath, 'utf-8');

    readmeContent = readmeContent.replace(
      /<!--STARTS_HERE_QUOTE_CARD-->(.|\n)*<!--ENDS_HERE_QUOTE_CARD-->/,
      cardDesign
    );

    fs.writeFileSync(readmePath, readmeContent);
  } catch (error) {
    console.error('Error updating quote:', error);
  }
}

updateQuote();
