from django.http import HttpResponse
from django.template import Context, loader
from django.shortcuts import render_to_response

from style911.tydget.models import ColorPickerWidget, TydgetField, TextFieldWidget

def index(request):
    color_chosen = ""
    submitted = 0
    cp_widget = ColorPickerWidget()
    tydget_list = initialize_form_data()
    
    # update the fields if this is a POST.
    if request.method == 'POST':
        # this is the submitted data
        form = request.POST
        submitted = 1

        for t in tydget_list:
            t.value = form[t.input_id]
    
    return render_to_response('color_picker.html', {
        
        'css': cp_widget.Media.css['all'],
        'js': cp_widget.Media.js,
        'field_list': tydget_list,
        
        'submitted': submitted,
    })
    

def initialize_form_data():
    tydget = [ ]
    tydget.append(TydgetField('color1', 'Color 1', 'color', '#339966'))
    tydget.append(TydgetField('color2', 'Color 2', 'color', '#FFCC33'))
    tydget.append(TydgetField('text1', 'Text 1', 'text', 'tears in my beer'))
    
    return tydget
