from django.conf.urls.defaults import *

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Example:
    # (r'^tydget_server/', include('tydget_server.foo.urls')),

    # Uncomment the admin/doc line below and add 'django.contrib.admindocs' 
    # to INSTALLED_APPS to enable admin documentation:
    # (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # (r'^admin/', include(admin.site.urls)),
#	(r'^polls/$', 'tydget_server.polls.views.no_param_index'),
#    (r'^polls/(?P<xid>\d+)/$', 'tydget_server.polls.views.xid_index'),
#    (r'^group/(?P<xid>\w+).js$', 'tydget_server.polls.views.group_request'),
#    (r'^user/(?P<xid>\d+)/$', 'tydget_server.polls.views.user_request'),
    (r'^django_parser\.js$', 'tydget_server.polls.views.no_param_index'),

)
