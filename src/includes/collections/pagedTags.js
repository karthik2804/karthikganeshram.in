module.exports = collection => {
    const postsCollection = collection.getFilteredByTag('post')
    let tagSet = new Set();
    postsCollection.forEach(templateObjet => {
        if ('tags' in templateObjet.data) {
            const tagsProperty = templateObjet.data.tags;
            if (Array.isArray(tagsProperty)) {
                tagsProperty.forEach(tag => tagSet.add(tag));
            } else if (typeof tagsProperty === 'string') {
                tagSet.add(tagsProperty);
            }
        }
    });
    const pagedTags = [];
    let indices = {}
    let pagedCollectionMaxIndex;
    [...tagSet].forEach(tag => {
        if (tag != 'post') {
            const tagCollection = collection.getFilteredByTag(tag);
            const pagedCollection = chunk(tagCollection, 5);
            indices[tag] = pagedCollection.length
            pagedCollection.forEach((templateObjectsArray, index) => {
                pagedCollectionMaxIndex = index;
                pagedTags.push({
                    tagName: tag,
                    path: index,
                    pageNumber: index,
                    pageData: templateObjectsArray
                });
            });
        }
    });
    const pagedCollectionLength = ++pagedCollectionMaxIndex;
    const groupedByTagName = chunk(pagedTags, pagedCollectionLength);
    groupedByTagName.forEach(group => {
        group.forEach((pageObject, index, source) => {
            pageObject.first = 0;
            pageObject.last = indices[source[0].tagName] - 1

            pageObject.previous = ((source[0].pageNumber > 0) ? index : undefined)
            pageObject.next = ((source[0].pageNumber < (indices[source[0].tagName] -1)) ? source[0].pageNumber + 1 : undefined)
        });
    });
    return pagedTags;
}


const chunk = (arr, chunkSize = 1, cache = []) => {
    const tmp = [...arr]
    if (chunkSize <= 0) return cache
    while (tmp.length) cache.push(tmp.splice(0, chunkSize))
    return cache
}