# frozen_string_literal: true
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def render_404
    render file: Rails.public_path.join('404.html'), layout: false, status: :not_found
  end
end
