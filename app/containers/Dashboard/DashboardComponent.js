/**
*
* DashboardNav
*
*/

// react
import React, { PropTypes } from 'react';

// material-ui
import { Card } from 'material-ui/Card';

// styles
import styles from './styles';

// components
import HeaderComponent from 'components/HeaderComponent';
import DashboardHeaderMenuComponent from './DashboardHeaderMenuComponent';

export default class Dashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: PropTypes.object,
    getMySessions: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getMySessions();
  }

  render() {
    return (
      <styles.components.DashboardGrid className="grid--dashboard">
        <HeaderComponent
          {...this.props}
          iconElementRight={<DashboardHeaderMenuComponent {...this.props} />}
        />
        <section className="card wide">
          <Card
            style={styles.inline.cardContent}
            containerStyle={{ height: '100%' }}
          >
            {this.props.children}
          </Card>
        </section>
      </styles.components.DashboardGrid>
    );
  }
}
