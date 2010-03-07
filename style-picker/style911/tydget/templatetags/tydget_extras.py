from django import template
from tydget.models import TydgetField

register = template.Library()

def render(field):
    # natalie, this template tag does not work.
    return "<p>Yeah, High 5!</p>"
    #return field.render()



