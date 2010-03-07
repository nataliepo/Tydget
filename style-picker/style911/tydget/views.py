from django.http import HttpResponse
from django.template import Context, loader
from django.shortcuts import render_to_response

from style911.tydget.models import ColorPickerWidget, TydgetField, TextFieldWidget

def index(request):
    color_chosen = ""
    submitted = 0
    cp_widget = ColorPickerWidget()
    
    tydget_list = initialize_form_data()
    css_results = ""
    
    # update the fields if this is a POST.
    if request.method == 'POST':
        # this is the submitted data
        form = request.POST
        submitted = 1

        for t in tydget_list:
            t['obj'].value = form[t['obj'].input_id]
            t['obj'].quick_render = t['obj'].render()
    
    
    return render_to_response('color_picker.html', {
        
        'css': cp_widget.Media.css['all'],
        'js': cp_widget.Media.js,
        'field_list': tydget_list,
                
        'submitted': submitted,
        'css_results': css_results,
    })
    

def initialize_form_data():
    tydget = [  ]
    # First, make the outer div elements (class="tydget")
    tydget.append({'obj' : TydgetField('color', 'Text Color', 'color', '#000000'),
        'class' : 'tydget'})
    tydget.append({'obj' : TydgetField('background', 'Background Color', 'color', '#999999'),
        'class' : 'tydget'})
    tydget.append({'obj' : TydgetField('width', 'Width', 'text', '300px'),
        'class': 'tydget'})
    
    return tydget

