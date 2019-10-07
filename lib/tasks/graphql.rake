# frozen_string_literal: true

namespace :graphql do
  task dump_schema: :environment do
    schema_defn = GraphHelpersSchema.to_definition
    schema_path = 'app/graphql/schema.graphql'
    File.write(Rails.root.join(schema_path), schema_defn)
  end
end
