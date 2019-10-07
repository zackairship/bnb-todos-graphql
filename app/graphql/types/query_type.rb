module Types
  class QueryType < Types::BaseObject
    field :todos,
      function: GraphQLHelpers::Functions::FindAll.new(Todo, connection: true),
      null: false
  end
end
