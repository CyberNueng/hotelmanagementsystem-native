import {PickerView, TabBar} from 'antd-mobile';
import { TabNavigator, TabView } from 'react-navigation'; // 2.0.1
import { Text, View } from 'react-native';

import { Icon } from 'react-native-elements';
import React from 'react'

class TabMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fullscreen: false,
            home: 'Home',
            info: 'Info',
            history: 'History',
            category: 'Category',
            selectedTab: this.props.page,
            hidden: false,
        };
    }

    renderContent(pageText) {
        return (
            <View
                onClick={(e) => {
                    e.preventDefault();
                        this.setState({
                            hidden: !this.state.hidden,
                        });
                }}
            />
        );
    }

    render() {
        const {home, info, history, category} = this.state;
        const { navigate } = this.props;
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                hidden={this.state.hidden}
            >
                <TabBar.Item
                    title={home}
                    key={home}
                    icon={require('../static/img/home.png')}
                    selectedIcon={require('../static/img/homes.png')}
                    selected={this.state.selectedTab === home}
                    onPress={() => navigate(home,{})}
                >
                    {this.renderContent({home})}
                </TabBar.Item>
                <TabBar.Item
                    icon={require('../static/img/category.png')}
                    selectedIcon={require('../static/img/categorys.png')}
                    title={category}
                    key={category}
                    selected={this.state.selectedTab === category}
                    onPress={() => navigate(category,{})}
                >
                {this.renderContent({category})}
                </TabBar.Item>
                <TabBar.Item
                    icon={require('../static/img/history.png')}
                    selectedIcon={require('../static/img/historys.png')}
                    title={history}
                    key={history}
                    selected={this.state.selectedTab === history}
                    onPress={() => navigate(history,{})}
                >
                {this.renderContent({history})}
                </TabBar.Item>
                <TabBar.Item
                    icon={require('../static/img/info.png')}
                    selectedIcon={require('../static/img/infos.png')}
                    title={info}
                    key={info}
                    selected={this.state.selectedTab === info}
                    onPress={() => navigate(info,{})}
                >
                {this.renderContent({info})}
                </TabBar.Item>
            </TabBar>
        );
    }
}
export default TabMenu;