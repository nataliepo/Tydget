# Create your views here.
from django.template import Context, loader

#import remoteobjects
#import typepad
#import typepadapp.models
import urllib2,base64,simplejson

from django.http import HttpResponse


def no_param_index(request):
	return HttpResponse("ERROR: Must pass in a TypePad XID.")
	
	
def user_request (request, xid):
	natalies_xid = '6p00e5539faa3b8833'
	typepad_api_url = 'http://api.typepad.com/users/%s/events.json?max-results=5' % natalies_xid
	
	debug = 1
	
	handle = urllib2.Request(typepad_api_url)
	js_str = simplejson.load(urllib2.urlopen(handle))
	
	output = "Hooray!  Your XID is: %s." % natalies_xid
	t = loader.get_template('polls/index.html')
	c = Context({
		'hello_string': output,	
		'js_str': js_str,
		'debug': debug,
	})
	#	return HttpResponse(output)
	return HttpResponse(t.render(c))
		
	
def group_request(request, xid):
#	mmmeows_group_xid = '6p0120a6255c8c970b'
# 	avatars_group_xid = '6p0120a6255c8c970b'
	
	debug = 0

	typepad_api_url = 'http://api.typepad.com/groups/%s/events.json?max-results=5&start-index=1' % xid

	handle = urllib2.Request(typepad_api_url)

	try:
		js_str = simplejson.load(urllib2.urlopen(handle))
	except IOError, e:
		print "parsing the API failed"
		return False
		
	# store the entries
	#entries = js_str.entries
	
	
	
	output = "Pelham 1 2 3, come in."
	t = loader.get_template('polls/index.html')
	c = Context({
		'hello_string': output,	
		'js_str': js_str,
		'debug': debug,
	})
#	return HttpResponse(output)
	return HttpResponse(t.render(c))
		
	