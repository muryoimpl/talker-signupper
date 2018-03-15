# frozen_string_literal: true

source 'https://rubygems.org'

ruby '2.4.2'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'pg'
gem 'puma', '~> 3.7'
gem 'rails', '~> 5.1.0'
gem 'sass-rails', '~> 5.0'
gem 'webpacker'

gem 'activerecord-import'
gem 'coffee-rails', '~> 4.2'
gem 'haml', '~> 5.0.0'
gem 'jb'
gem 'jbuilder'
gem 'material_design_lite-rails'
gem 'rack-cors'
gem 'uglifier', '>= 1.3.0'

# Use Redis adapter to run Action Cable in production
gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: %i(mri mingw x64_mingw)
  gem 'deka_eiwakun'
  gem 'factory_girl_rails'
  gem 'pry-byebug'
  gem 'pry-rails'
  # Adds support for Capybara system testing and selenium driver
  gem 'action-cable-testing'
  gem 'capybara', '~> 2.13.0'
  gem 'rspec-rails', group: :test
  gem 'selenium-webdriver'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'web-console', '>= 3.3.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
