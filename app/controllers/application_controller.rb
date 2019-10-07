class ApplicationController < ActionController::Base
  before_action :authenticate_user

  def authenticate_user
    @jwt = request.headers['Authorization']&.gsub('Bearer ', '');
  end

  def current_user
    return nil if @jwt.nil?

    @current_user ||= User.find_by(jwt: @jwt)
  end
end
