module Types
  class TodoInputType < BaseInputObject
    argument :title, String, required: false
    argument :description, String, required: false
    argument :status, String, required: false
  end
end
