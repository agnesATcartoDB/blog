module Jekyll
  module ThumbnailFilter
    def thumbnail_url(input, post_url, post_title)
      m = input.match(/src=("|')(.*?\.(?:gif|jpeg|jpg|png))/)

      if m.nil?
        %|<a href="#{post_url}" alt="#{post_title}" class="thumbnail"></a>|
      else
        %|<a href="#{post_url}" style="background-image: url(#{m[2]})" alt="#{post_title}" class="thumbnail with-layout-color"></a>|
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::ThumbnailFilter)
