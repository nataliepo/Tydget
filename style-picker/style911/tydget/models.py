from django.db import models

from tydget.widgets import ColorPickerWidget, TextFieldWidget

class ColorField(models.CharField):
    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 10
        super(ColorField, self).__init__(*args, **kwargs)

    def formfield(self, **kwargs):
        kwargs['widget'] = ColorPickerWidget
        return super(ColorField, self).formfield(**kwargs)

class TextField(models.CharField):
    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 30
        super(TextField, self).__init__(*args, **kwargs)

    def formfield(self, **kwargs):
        kwargs['widget'] = TextFieldWidget
        return super(TextField, self).formfield(**kwargs)
        
 
class TydgetField(models.Model):
    input_id = models.CharField(max_length=30)
    label = models.CharField(max_length=30)
    input_type = models.CharField(max_length=10)
    value = models.CharField(max_length=100)
    
    def __init__(self, input_id, input_label, input_type, value):
        self.input_id = input_id
        self.label = input_label
        self.input_type = input_type
        self.value = value
        self.quick_render = self.render()
        
    def render(self):
        if (self.input_type == 'color'):

            cp_widget = ColorPickerWidget()
            # always show the picker in case they want to pick again.
            return cp_widget.render(self.input_id, self.value, {
                'id': self.input_id,
            })
        else:
            txt_widget = TextFieldWidget()
            return txt_widget.render(self.input_id, self.value)



        
