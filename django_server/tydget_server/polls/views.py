# Create your views here.
from django.template import Context, loader

#import remoteobjects
#import typepad
#import typepadapp.models
import urllib2,base64,simplejson

from django.http import HttpResponse


def no_param_index(request):
	return HttpResponse("ERROR: Must pass in a TypePad XID.")
	
	
def xid_index(request, xid):
	natalies_xid = '6p00e5539faa3b8833'
	typepad_api_url = 'http://api.typepad.com/users/%s.json' % natalies_xid

	handle = urllib2.Request(typepad_api_url)

#	try:
	js_str = simplejson.load(urllib2.urlopen(handle))
#	js_str = "just a dummy"
	
#	except IOError, e:
#		print "parsing the API failed"
#		return False
	
	
	output = "Hooray!  Your XID is: %s." % natalies_xid
	t = loader.get_template('polls/index.html')
	c = Context({
		'hello_string': output,	
		'js_str': js_str,
	})
#	return HttpResponse(output)
	return HttpResponse(t.render(c))
		
	