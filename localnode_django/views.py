from django import forms
from django.http import HttpResponse
from django.template import Template, RequestContext

class AForm(forms.Form):
    name = forms.CharField()

def form_post(request):
    if request.method == 'POST':
        form = AForm(request.POST)
        if form.is_valid():
            return HttpResponse('It worked, %s!' %
                    form.cleaned_data['name'].encode('ascii'))
    form = AForm()
    t = Template("""
    <html>
      <body>
        <form action='.' method='POST'>
            {% csrf_token %}
            <table>{{ form }}</table>
            <input type='submit' value="that's me">
        </form>
      </body>
    </html>
    """)
    return HttpResponse(t.render(RequestContext(request, {
        'form': form,
    })))

