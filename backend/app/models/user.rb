class User < ActiveRecord::Base
  before_create :set_default_empty_values

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable,
         :validatable

  validates :email, presence: true, uniqueness: true

  private

  def set_default_empty_values
    self.api_key = SecureRandom.hex(25)
  end
end
