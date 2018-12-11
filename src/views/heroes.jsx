import React, { Component } from 'react';
class Heroes extends React.Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            items: {},
            Me: "", 
            Enemy: ""
        };
    }
    meOnChange(event) {
        this.setState({ Me: event.target.value });
    }

    enemyOnChange(event) {
        this.setState({ Enemy: event.target.value });
    }

    componentDidMount() {
        var self = this;
        fetch("https://api.opendota.com/api/heroes")
            .then(res => res.json())
            .then(
                (result) => {
                    self.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items, sortedItems } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <React.Fragment>
                    <span> Me 
                <select id="me" onChange={this.meOnChange.bind(this)}>
                    {items.map(item => (
                        <option value={item.id}>
                            {item.name}
                        </option>
                    ))}
                        </select> 
                        </span>
                    <span>Enemy
                    <select id="enemy" onChange={this.enemyOnChange.bind(this)}>
                        {items.map(item => (
                            <option value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select> </span>
                 </React.Fragment>
            );
        }
    }
}
export default Heroes;