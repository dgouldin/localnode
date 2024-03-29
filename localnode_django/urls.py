from django.conf import settings
from django.conf.urls.defaults import patterns, include, url
from localnode_django import views

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^form/$', views.form_post, name='form_post'),
    # Examples:
    # url(r'^$', 'localnode_django.views.home', name='home'),
    # url(r'^localnode_django/', include('localnode_django.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)

if settings.DEBUG:
    urlpatterns += patterns('',
        url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
            'document_root': settings.MEDIA_ROOT,
        }),
   )
