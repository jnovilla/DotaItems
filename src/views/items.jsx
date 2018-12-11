import React, { Component } from 'react';
import Heroes from './heroes';
class Items extends React.Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            items: {},
            sortedItems:[]
        };
    }

    componentDidMount() {
        var self = this;
        fetch("https://api.opendota.com/api/explorer?sql=SELECT%0AItem_0.name%20as%20item_1%2C%0AItem_1.name%20as%20item_2%2C%0AItem_2.name%20as%20item_3%2C%0AItem_3.name%20as%20item_4%2C%0AItem_4.name%20as%20item_5%2C%0AItem_5.name%20as%20item_6%0AFROM%20matches%0AJOIN%20match_patch%20using(match_id)%0AJOIN%20leagues%20using(leagueid)%0AJOIN%20player_matches%20using(match_id)%0ALEFT%20JOIN%20items%20as%20Item_0%20on%20player_matches.item_0%20%3D%20Item_0.id%0ALEFT%20JOIN%20items%20as%20Item_1%20on%20player_matches.item_1%20%3D%20Item_1.id%0ALEFT%20JOIN%20items%20as%20Item_2%20on%20player_matches.item_2%20%3D%20Item_2.id%0ALEFT%20JOIN%20items%20as%20Item_3%20on%20player_matches.item_3%20%3D%20Item_3.id%0ALEFT%20JOIN%20items%20as%20Item_4%20on%20player_matches.item_4%20%3D%20Item_4.id%0ALEFT%20JOIN%20items%20as%20Item_5%20on%20player_matches.item_5%20%3D%20Item_5.id%0AJOIN%20player_matches%20as%20Enemy%20using(match_id)%0AJOIN%20heroes%20on%20heroes.id%20%3D%20player_matches.hero_id%0ALEFT%20JOIN%20notable_players%20ON%20notable_players.account_id%20%3D%20player_matches.account_id%0ALEFT%20JOIN%20teams%20using(team_id)%0AWHERE%20TRUE%0AAND%20(Enemy.hero_id%20%3D%2044%20and%20player_matches.hero_id%20%3D%2096)%0AAND%20matches.start_time%20%3E%3D%20extract(epoch%20from%20timestamp%20%272018-11-10T21%3A10%3A31.368Z%27)%0AORDER%20BY%20matches.match_id%20NULLS%20LAST%0A%0ALIMIT%20200%0A")
            .then(res => res.json())
            .then(
            (result) => {
                let dict_items = {};
                let sort = [];
                // if not in hash, add to hash plus 1. else +1 to hash spot
                // need to do it for each item in the row
                var name = "";
                result.rows.map(x => {
                    // per attribute in x
                    for (var item in x) {
                        name = (x[item] ? x[item].replace("item_", ""): null);
                        if (dict_items[name]) {
                            dict_items[name] += 1;
                        } else dict_items[name] = 1;
                    }   
                });
                sort = Object.keys(dict_items) //Create a list from the keys of your map. 
                    .sort( //Sort it ...
                        function (a, b) { // using a custom sort function that...
                            // compares (the keys) by their respective values.
                            return dict_items[b] - dict_items[a];
                        })
                    self.setState({
                        isLoaded: true,
                        items: dict_items,
                        sortedItems: sort
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
                <ul>
                    {sortedItems.map(item => (
                        <li>
                            {item} {items[item]}
                        </li>
                    ))}
                    </ul>
                    </React.Fragment>
            );
        }
    }
}
export default Items;