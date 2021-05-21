const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const util = require('util')



module.exports = function(eleventyConfig) {
    const pagedTagsCollection = require('./src/includes/collections/pagedTags');
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

    eleventyConfig.addFilter('dump', obj => {
        return util.inspect(obj)
      });
    
    eleventyConfig.setDataDeepMerge(true);
    eleventyConfig.addPassthroughCopy({ "src/assets": "/assets" })
    eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" })
    eleventyConfig.addPassthroughCopy({ "src/blog/**/*.jpg": "/assets/images" })
    eleventyConfig.addPassthroughCopy({ "src/blog/**/*.png": "/assets/images" })
    eleventyConfig.addPassthroughCopy({ "src/images/*.jpg": "/assets/images" })
    eleventyConfig.addPassthroughCopy({ "src/images/*.png": "/assets/images" })
    eleventyConfig.setTemplateFormats([
        "md",
    ]);

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    eleventyConfig.addNunjucksFilter("trimTitle", function(value) {
        return (value.slice(0, 30) + "...")
    })
    eleventyConfig.addNunjucksFilter("formatPostDate", function(value) {
        return months[value.getMonth()] + " " + value.getDate() + ", " + (value.getYear() + 1900)
    })

    eleventyConfig.addNunjucksFilter("returnKeys", function(value) {
        return Object.keys(value)
    })

    eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article));

    eleventyConfig.addCollection('pagedTags', collection => {
        let test = pagedTagsCollection(collection)
        return test
    })
    eleventyConfig.addCollection('pagedTagsListing', collection => {
        let test = pagedTagsCollection(collection).reduce((accumulatorObject, currentItem) => {
            const tagNameProp = currentItem.tagName
            if (!accumulatorObject[tagNameProp]) accumulatorObject[tagNameProp] = [];
            accumulatorObject[tagNameProp].push(currentItem);
            return accumulatorObject
        }, {})
        return test
    })
    return {
        dir: {
            input: "src",
            includes: "includes",
            layouts: "layouts",
            data: "data"
        }
    }
}

function extractExcerpt(article) {
    if (!article.hasOwnProperty('templateContent')) {
        console.warn('Failed to extract excerpt: Document has no property "templateContent".');
        return null;
    }
    let excerpt = null;
    const content = article.templateContent;
    excerpt = content.split("\n",1)[0].slice(0, 150);
    if(excerpt.length == 150) {excerpt = excerpt + "..."}
    
    return excerpt;
}