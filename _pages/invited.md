---
title: SINM 2025 Invited Speakers
permalink: /invited/
classes: wide
---
{% for category in site.data.invited_speakers.categories %}
  <h2>{{category.heading}}</h2>
  <ul>
  {% for speaker in category.speakers %}
    <li><strong><a href="{{speaker.url}}">{{speaker.name}}</a></strong>, <strong>{{speaker.affiliation}}</strong>
    {% if speaker.title %}
    - <em>{{speaker.title}}</em>
    {% endif %}
    {% if speaker.abstract %}
      <br>
      {{speaker.abstract}}.
    {% endif %}
    </li>
  {% endfor %} 
  </ul>
{% endfor %}

