import React, {Component} from 'react';
import '../../package.css';
import Nutrition7B from './nutrition7B';
import NoPackage from '../../nopackage'
import axios from 'axios';

export default class Package7daysA extends Component {

	constructor() {
    super();
    this.state = {
      packages: {},
			isLoaded: false
		}
		this.addPack7DaysBToCart = this.addPack7DaysBToCart.bind(this)
  }
  
  componentDidMount() {
    axios.get('/api/packages/system/7days')
    .then(res => {
      this.setState({ 
				isLoaded: true, 
				packages: res.data,
			});
		})
		.then(() => {
			console.log(this.state.packages)
		});
	}
	
	addPack7DaysBToCart() {
		console.log("add pack")
		const pack7B = {
			package_id: this.state.packages[1]._id,
			name_package: "Package 7 days B",
			price: this.state.packages[1].price
		}
		axios.put("/api/orders/add/package", pack7B);
	}

	render() {
		const {	packages,
						isLoaded, 
					} = this.state;
		if (!!!isLoaded) {
			return <React.Fragment />
		}
		if(packages.length===0) {
			console.log("in no pack")
			return <NoPackage />
		}

		return (
			<React.Fragment>
			<div className='package-box '>
				<div className='row'>
					<div className='col-md card-package'>
						DAY 1
						<div className='row'>
							<div className='col-sm card-pack-img hovereffect'>
								<img className='card-img img-responsive' src={packages[1].day_meal[0].meal_1.img_url} />
                <div className='overlay'>
                  <h2>{packages[1].day_meal[0].meal_1.menu_name}</h2>
                </div>
							</div>
							<div className='col-sm card-pack-img hovereffect'>
								<img className='card-img img-responsive' src={packages[1].day_meal[0].meal_2.img_url} />
                <div className='overlay'>
                  <h2>{packages[1].day_meal[0].meal_2.menu_name}</h2>
                </div>
							</div>
						</div>
					</div>
					<div className='col-md card-package'>
						DAY 2
						<div className='row'>
							<div className='col-sm card-pack-img hovereffect'>
								<img className='card-img img-responsive' src={packages[1].day_meal[1].meal_1.img_url} />
                <div className='overlay'>
                  <h2>{packages[1].day_meal[1].meal_1.menu_name}</h2>
                </div>
							</div>
							<div className='col-sm card-pack-img hovereffect'>
								<img className='card-img img-responsive' src={packages[1].day_meal[1].meal_2.img_url} />
                <div className='overlay'>
                  <h2>{packages[1].day_meal[1].meal_2.menu_name}</h2>
                </div>
							</div>
						</div>
					</div>
				</div>	

        <div className='row'>
					<div className='col-md card-package'>
						DAY 3
						<div className='row'>
							<div className='col-sm card-pack-img hovereffect'>
								<img className='card-img img-responsive' src={packages[1].day_meal[2].meal_1.img_url} />
                <div className='overlay'>
                  <h2>{packages[1].day_meal[2].meal_1.menu_name}</h2>
                </div>
							</div>
							<div className='col-sm card-pack-img hovereffect'>
								<img className='card-img img-responsive' src={packages[1].day_meal[2].meal_2.img_url} />
                <div className='overlay'>
                  <h2>{packages[1].day_meal[2].meal_2.menu_name}</h2>
                </div>
							</div>
						</div>
					</div>
					<div className='col-md card-package'>
						DAY 4
						<div className='row'>
							<div className='col-sm card-pack-img hovereffect'>
								<img className='card-img img-responsive' src={packages[1].day_meal[3].meal_1.img_url} />
                <div className='overlay'>
                  <h2>{packages[1].day_meal[3].meal_1.menu_name}</h2>
                </div>
							</div>
							<div className='col-sm card-pack-img hovereffect'>
								<img className='card-img img-responsive' src={packages[1].day_meal[3].meal_2.img_url} />
                <div className='overlay'>
                  <h2>{packages[1].day_meal[3].meal_2.menu_name}</h2>
                </div>
							</div>
						</div>
					</div>
				</div>	

        <div className='row'>
					<div className='col-md card-package'>
						DAY 5
						<div className='row'>
							<div className='col-sm card-pack-img hovereffect'>
								<img className='card-img img-responsive' src={packages[1].day_meal[2].meal_1.img_url} />
                <div className='overlay'>
                  <h2>{packages[1].day_meal[2].meal_1.menu_name}</h2>
                </div>
							</div>
							<div className='col-sm card-pack-img hovereffect'>
								<img className='card-img img-responsive' src={packages[1].day_meal[2].meal_2.img_url} />
                <div className='overlay'>
                  <h2>{packages[1].day_meal[2].meal_2.menu_name}</h2>
                </div>
							</div>
						</div>
					</div>
					<div className='col-md card-package'>
						DAY 6
						<div className='row'>
							<div className='col-sm card-pack-img hovereffect'>
								<img className='card-img img-responsive' src={packages[1].day_meal[3].meal_1.img_url} />
                <div className='overlay'>
                  <h2>{packages[1].day_meal[3].meal_1.menu_name}</h2>
                </div>
							</div>
							<div className='col-sm card-pack-img hovereffect'>
								<img className='card-img img-responsive' src={packages[1].day_meal[3].meal_2.img_url} />
                <div className='overlay'>
                  <h2>{packages[1].day_meal[3].meal_2.menu_name}</h2>
                </div>
							</div>
						</div>
					</div>
				</div>	
				
        <div className='row'>
				<div className='col-3-md col-set'></div>
				<div className='col-md card-last-package '>
					DAY 7
					<div className='row'>
						<div className='col-sm card-pack-img hovereffect'>
							<img className='card-img img-responsive' src={packages[1].day_meal[4].meal_1.img_url} />
							<div className='overlay'>
								<h2>{packages[1].day_meal[4].meal_1.menu_name}</h2>
							</div>
						</div>
						<div className='col-sm card-pack-img hovereffect'>
							<img className='card-img img-responsive' src={packages[1].day_meal[4].meal_2.img_url} />
							<div className='overlay'>
								<h2>{packages[1].day_meal[4].meal_2.menu_name}</h2>
							</div>
						</div>
					</div>
				</div>
				<div className='col-3-md col-set'></div>
				</div>
				<a href="/cart">
        <button className='btn btn-set' onClick={this.addPack7DaysBToCart} data-toggle="tooltip" data-placement="top" title="HAVE A GOOD MEAL :)"> Add to cart </button>
    		</a>
				</div>
        <Nutrition7B />
			</React.Fragment>
		);
	}
}