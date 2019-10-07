module Types
  class UserInputType < BaseInputObject
    argument :email, String, required: false
    argument :password, String, required: false
    argument :first_name, String, required: false
    argument :last_name, String, required: false
  end
end
