import React from 'react';
import { Row, Table } from 'antd';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { ColumnProps } from 'antd/lib/table';

interface TodoColumn {
  key: number;
};

interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

interface FetchVariables {
  first: number;
  after?: string;
  filters?: { [key: string]: string }
}

const fetchTodos = gql`
  query fetchTodos($filters: JSON) {
    todos(filters: $filters) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        cursor
        node {
          id
          title
          description
          status
        }
      }
    }
  }
`;

const Todos: React.FC = () => {
  const [todoList, setTodoList] = React.useState([]);
  const [sortOption, setSortOption] = React.useState('title asc');
  const [pagination, setPagination] = React.useState({ current: 1, pageSize: 2, total: 0 });
  const [pageInfo, setPageInfo] = React.useState({} as PageInfo);
  const { data, loading, refetch } = useQuery<any, FetchVariables>(fetchTodos, {
    variables: {
      first: pagination.pageSize,
      filters: {
        s: sortOption
      }
    }
  });

  React.useEffect(() => {
    if (loading) { return; }

    setTodoList(data.todos.edges.map((edge: any) => edge.node));
    setPagination({ ...pagination, total: data.todos.totalCount });
    setPageInfo(data.todos.pageInfo);
  }, [loading]);

  React.useEffect(() => {
    // Cheap way to skip the first run of this
    if (pagination.total === 0) return

    const variables: FetchVariables = {
      after: pageInfo.endCursor,
      first: pagination.pageSize,
      filters: {}
    };
    if (sortOption !== null) {
      variables.filters['s'] = sortOption;
    }
    // if (searchValue !== null) {
    //   const fuzzySearchValue = `%${searchValue}%`
    //   variables.filters['m'] = 'or';
    //   variables.filters['firstNameMatches'] = fuzzySearchValue;
    //   variables.filters['lastNameMatches'] = fuzzySearchValue;
    //   variables.filters['emailMatches'] = fuzzySearchValue;
    //   variables.filters['phoneMatches'] = fuzzySearchValue;
    // }

    refetch(variables);
  }, [sortOption, pagination.current]);

  const columns: ColumnProps<TodoColumn>[] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: true,
      defaultSortOrder: 'ascend'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: true
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true
    }
  ];

  const onTableChange = (pagination: any, filters: any, sorter: any) => {
    setPagination(pagination);

    if (sorter.columnKey === undefined) {
      setSortOption('title asc');
    } else {
      const sortOrder = sorter.order == 'ascend' ? 'asc' : 'desc';
      setSortOption(`${sorter.columnKey} ${sortOrder}`);
    }
  };

  return (
    <Row>
      <h1>Todos</h1>

      <Table
        columns={columns}
        pagination={pagination}
        dataSource={todoList}
        onChange={onTableChange}
        rowKey="id"
      />
    </Row>
  );
};

export default Todos;
