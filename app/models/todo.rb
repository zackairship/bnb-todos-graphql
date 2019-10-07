class Todo < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true

  enum status: {
    unchecked: 0,
    checked: 1
  }
end
