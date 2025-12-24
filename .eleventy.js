const htmlmin = require("html-minifier-terser");

module.exports = function (eleventyConfig) {

  // This makes the eleventy command quieter (with less detail) 
  // eleventyConfig.setQuietMode(true);

  // This will stop the default behaviour of foo.html being turned into foo/index.html
  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

  // This will make Eleventy not use your .gitignore file to ignore files
  eleventyConfig.setUseGitIgnore(false);

  // This will copy this folder to the output without modifying it at all
  eleventyConfig.addPassthroughCopy("src/assets");

  // Heavy folder - I'll just copy this manually 
  // eleventyConfig.addPassthroughCopy("src/images");
  
  eleventyConfig.addPassthroughCopy("css"); 
  
  // This defines which files will be copied
  eleventyConfig.setTemplateFormats(["html", "njk", "txt", "js", "css", "xml", "json"]);

  eleventyConfig.addTransform("htmlmin", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      });
      return minified;
    }
    return content;
  });

  return {
    dir: {
      input: "src", // templates and pages
      output: "public", // generated, finished html files uploaded to web
    },
  };
};
