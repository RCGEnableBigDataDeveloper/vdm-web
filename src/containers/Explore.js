import React, { Component } from 'react'
import Uploader from '../components/Uploader'
import * as config from '../config';
import ReactTable from "react-table";
import { Tabs, Tab } from 'react-bootstrap';
import 'react-table/react-table.css'
import Parser from '../components/Parser'

class Explore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: true,
            dataSources: "[]",
            selectedFile: null,
            loaded: 0,
            tabKey: 1
        };

        this.handleTabSelect = this.handleTabSelect.bind(this)

    }

    handleTabSelect(key) {
        this.setState({ tabKey: key })
    }

    render() {
        const { tabKey } = this.state

        const columns = [{
            Header: 'ID',
            accessor: 'id'
        }, {
            Header: 'Name',
            accessor: 'name'
        }, {
            Header: 'Recipe',
            accessor: 'recipe'
        }, {
            Header: 'Flow',
            accessor: 'flow'
        }, {
            Header: 'Created At',
            accessor: 'createdAt'
        }, {
            Header: 'Updated At',
            accessor: 'updatedAt'
        },
        {
            Header: 'Recipe',
            accessor: 'url',
            Cell: props => <a href={props.value} target='_blank'>{props.value}</a>
        }
        ]

        return (
            <div>
                <div className='sub-menu'>
                    <Tabs defaultActiveKey={tabKey} onSelect={this.handleTabSelect} animation={false} id="noanim-tab-example">
                        <Tab className='tab-content' eventKey={1} title="Extract">
                            <div>

                                <div style={{ padding: '20px' }}>Wrangled Datasets<hr />

                                    <ReactTable
                                        data={JSON.parse(this.state.dataSources)}
                                        columns={columns}
                                        manual
                                        loading={this.state.loading}
                                        onFetchData={(state, instance) => {
                                            // show the loading overlay
                                            this.setState({ loading: true })
                                            // fetch your data
                                            fetch(config.VDM_SERVICE_HOST + '/getWrangledSets')
                                                .then(res => res.json())
                                                .then(
                                                    (result) => {

                                                        var data = []
                                                        result.data.map((elem, i) => {
                                                            var url = `http://52.201.45.52:3005/data/${elem.flow.id}/${elem.id}`;
                                                            data.push({ "name": elem.name, "id": elem.id, "recipe": elem.recipe.id, "flow": elem.flow.id, "createdAt": elem.createdAt, "updatedAt": elem.updatedAt, "url": url })
                                                            // console.log(this.state.dataSources)
                                                        });

                                                        this.setState({
                                                            loading: false,
                                                            dataSources: JSON.stringify(data)
                                                        });


                                                    },

                                                    (error) => {
                                                        console.log(error)
                                                    }
                                                )
                                        }}
                                    />

                                </div>
                            </div>

                        </Tab>

                        <Tab className='tab-content' eventKey={2} title="Parse">
                            <Uploader></Uploader>
                            <Parser></Parser>
                        </Tab>
                    </Tabs>
                </div>


            </div>
        );
    }
}



export default Explore