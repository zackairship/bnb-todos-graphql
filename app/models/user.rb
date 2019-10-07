class User < ApplicationRecord
  before_create :set_jwt

  has_secure_password

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true

  def set_jwt
    self.jwt = SecureRandom.hex
  end
end
