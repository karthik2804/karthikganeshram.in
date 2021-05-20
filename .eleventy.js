const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

module.exports = function(eleventyConfig) {
    let markdownIt = require("markdown-it")
    let markdownItAttrs = require("markdown-it-attrs")

    let options = {
        html: true,
        breaks: true,
        linkify: true,
    }

    let markdownLib = markdownIt(options).use(markdownItAttrs, {})
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.setLibrary("md", markdownLib)

    eleventyConfig.addPassthroughCopy({ "src/assets/*": "/assets" })
    eleventyConfig.setTemplateFormats([
        "md",
    ]);
    return {
        dir: {
            input: "src",
            includes: "includes",
            layouts: "layouts",
            data: "data"
        }
    }
}