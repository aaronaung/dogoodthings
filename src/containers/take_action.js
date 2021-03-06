import React from 'react';
import { connect } from 'react-redux';
// import OrgTable from '../components/org_table';
import { fetchCharities } from '../actions/fetch_actions';
import CharityCard from "../components/charity_card";
import countries from '../countries.json'

class TakeAction extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            category: "",
            country: ""
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.getCharities = this.getCharities.bind(this);
    }

    onInputChange(event, type){
        var changedObject = {};
        changedObject[type] = event.target.value;
        this.setState(changedObject);
    }

    getCharities(event){
        event.preventDefault();
        this.setState({category: "", country: ""})
        this.props.getCharities(this.state.category, this.state.country);
    }

    render() {
        var hidden = this.props.facts.length === 0; 
        return(
            //hidden should be released once facts are generated.
            <div id="takeAction" hidden={hidden} className="section-container container">
                <h5 id="noCharities" hidden={!this.props.emptyCharities}><i className="fa fa-exclamation-circle mr-2"></i><i>No Charity Found</i></h5>
                <h2 className="title pt-5 pb-3">Let's Make a Difference</h2>
                <hr/>
                <form action="" className="form-inline">
                    <select value={this.state.category} onChange={(e) => this.onInputChange(e,'category')} className="form-control mr-2" name="" id="">
                        <option value="">Select a category</option>
                        {this.props.charityCategories.map((category) => {
                            return <option key={category.id} value={category.id}>{category.name}</option>
                        })}
                    </select>
                    <select value={this.state.country} onChange={(e) => this.onInputChange(e,'country')} className="form-control mr-2" name="" id="">
                        <option value="">Select a country</option>
                        {countries.map((country) => {
                            return <option key={country.code} value={country.code}>{country.name}</option>
                        })}
                    </select>
                    <button disabled={this.props.fetchStatus.FETCHING_CHARITIES} onClick={this.getCharities} className="search btn-md btn-primary btn mr-2">Search for charities</button>
                </form>

                <div className="row mb-5">
                    <i hidden={this.props.fetchStatus.FETCHING_CHARITIES ? false: true} id="fetchingCharities" className="fa fa-spinner fa-spin"></i>
                    
                    {this.props.charities.map( (charity) => {

                        var imageUrl = charity.image === undefined ? "" : charity.image.imagelink[charity.image.imagelink.length-1].url;
                        var charityName = charity.title === undefined ? "TITLE NOT PROVIDED": charity.title;
                        var description = charity.summary === undefined ? "DESCRIPTION NOT PROVIDED": charity.summary;
                        var webUrl = charity.contactUrl === undefined? "" : charity.contactUrl;
                        var donationUrl = charity.projectLink === undefined? "": charity.projectLink;
                        var goal = charity.goal === undefined? 0 : charity.goal;
                        var funding = charity.funding === undefined? 0: charity.funding;
                       
                        return <CharityCard 
                            fetching ={this.props.fetchStatus.FETCHING_CHARITIES}
                            imgUrl={imageUrl}
                            charityName = {charityName}
                            description = {description}
                            webUrl = {webUrl}
                            donationUrl = {donationUrl}
                            funding = {funding}
                            goal = {goal}
                        />
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        facts : state.facts,
        charityCategories: state.charityCategories,
        charities: state.charities,
        fetchStatus: state.fetchStatus,
        emptyCharities: state.emptyCharities
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCharities: (categoryId, name) => dispatch(fetchCharities(categoryId, name)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TakeAction);