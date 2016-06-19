{% include layout/header.html %}

{% if page.image != "" %}<img src="{{ site.image_path }}{{ page.image }}" width="72" height="108" title="project icon">{% endif %}

**Problem**: {{ page.problem }}

**Solution**: {{ page.solution }}

-----

{{ content }}

{% include layout/footer.html %}
