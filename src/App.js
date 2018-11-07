import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import moment from 'moment';

import './App.css';

const API = 'https://api.opendota.com/api/proMatches';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    }
    this.columns = [
      {
        title: 'Match_id',
        dataIndex: 'match_id',
        width: 165,
        sorter: (a, b) => a.match_id - b.match_id,
      }, {
        title: 'Duration',
        dataIndex: 'duration',
        width: 150,
        render: (text, record) => (
          <div>
            {moment.utc(moment.duration(text, "s").asMilliseconds()).format("HH:mm:ss")}
          </div>
        ),
        sorter: (a, b) => a.duration - b.duration,
      }, {
        title: 'Start_time',
        dataIndex: 'start_time',
        width: 160,
        render: (text, record) => (
          <div>
            {moment.utc(moment.duration(text, "ms").asMilliseconds()).format("HH:mm:ss")}
          </div>
        ),
        sorter: (a, b) => a.start_time - b.start_time
      }, {
        title: 'Radiant_team_id',
        dataIndex: 'radiant_team_id',
        width: 170
      }, {
        title: 'Radiant_name',
        dataIndex: 'radiant_name',
        width: 170
      }, {
        title: 'Dire_team_id',
        dataIndex: 'dire_team_id',
        width: 150
      }, {
        title: 'Dire_name',
        dataIndex: 'dire_name',
        width: 150
      }, {
        title: 'Leagueid',
        dataIndex: 'leagueid',
        width: 150
      }, {
        title: 'League_name',
        dataIndex: 'league_name',
        width: 200
      }, {
        title: 'Series_id',
        dataIndex: 'series_id',
        width: 150
      }, {
        title: 'Series_type',
        dataIndex: 'series_type',
        width: 150
      }, {
        title: 'Radiant_score',
        dataIndex: 'radiant_score',
        width: 150,
        sorter: (a, b) => a.radiant_score - b.radiant_score
      }, {
        title: 'Dire_score',
        dataIndex: 'dire_score',
        width: 150,
        sorter: (a, b) => a.dire_score - b.dire_score
      }, {
        title: 'Radiant_win',
        dataIndex: 'radiant_win',
        width: 150
      }]

    this.fetchMetches();
  };

  fetchMetches() {
    fetch(API, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => {
      console.log('response', response)
      return response.json();
    }).then(responseInJson => {
      this.setState({
        data: responseInJson,
      });
      console.log('resINJSON', responseInJson)
    }).catch(error => {
      console.log(error)
    });
  }
  render() {
    const { data } = this.state;
    const columns = this.columns;

    return (
      <div>
        <h2>DOJO <br></br>MADNESS</h2>
        <Table
          rowKey='match_id'
          bordered
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 50 }}
          scroll={{ x: 2000, y: 500 }}
        />
      </div>
    );
  }
}

export default App;
