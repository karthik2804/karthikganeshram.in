---
layout: blog.njk
pagination:
  data: collections.pagedTags
  size: 1
  alias: tag
permalink: /blog/tags/{{ tag.tagName | slug }}/{% if tag.pageNumber %}{{ tag.pageNumber + 1 }}/{% endif %}
containsPagination: true
---