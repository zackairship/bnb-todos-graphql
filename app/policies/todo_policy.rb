class TodoPolicy < AuthenticatedPolicy
  def index?
    true
  end
end
