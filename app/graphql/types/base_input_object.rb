module Types
  class BaseInputObject < GraphQL::Schema::InputObject
    argument :id, ID, required: false
  end
end
