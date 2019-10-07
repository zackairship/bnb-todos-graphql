module Types
  class QueryType < Types::BaseObject
    field :user, function: Functions::FindUser.new, null: true

    field :todos,
      function: GraphQLHelpers::Functions::FindAll.new(Todo, connection: true),
      null: false
  end
end
