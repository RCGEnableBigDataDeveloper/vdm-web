// const canvasInitialState = {
//     nodes: [
//         { id: 's1', name: 'source1', left: 100, top: 100 },
//         { id: 's2', name: 'target1', left: 100, top: 300 },
//         { id: 'hello', name: 'hello', left: 50, top: 500 }
//     ],
//     connections: [
//         { source: 's1', target: 's2', type: 'basic' },
//         { source: 's2', target: 'hello', type: 'basic' }
//     ]

// }
const acquireCanvas = (state = { nodes: [], connections: [] }, action) => {
    switch (action.type) {
        case 'ADD_NODE':
            state.nodes = [...state.nodes, action.node]
            return state

        case 'ADD_CONNECTION':
            state.connections = [...state.connections, action.connection]
            return state

        case 'REMOVE_CONNECTION':
            return { ...state, connections: state.connections.filter(c => c.source !== action.connection.source) }

        case 'REMOVE_NODE':
            return { ...state, nodes: state.nodes.filter(n => n.id !== action.id) }

        case 'CLEAR_CANVAS':
            return { nodes: [], connections: [] };

        default:
            return state
    }
}

export default acquireCanvas