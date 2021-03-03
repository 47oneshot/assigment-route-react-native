import React, { Component } from 'react';
import { View, Text , StyleSheet, Dimensions,PermissionsAndroid,TouchableOpacity,Image, Modal,Pressable} from 'react-native';
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      dataBus1: {
        battery: '',
        velocity:'',
        button_press: '',
        id : '',
        latitude :'',
        longitude :'',
        power_good:'',
        rssi : '',
        createdAt: '',
        updatedAt:''

      },
      dataBus2: {
        battery: '',
        velocity:'',
        button_press: '',
        id : '',
        latitude :'',
        longitude :'',
        power_good:'',
        rssi : '',
        createdAt: '',
        updatedAt:''

      },
      dataBus3: {
        battery: '',
        velocity:'',
        button_press: '',
        id : '',
        latitude :'',
        longitude :'',
        power_good:'',
        rssi : '',
        createdAt: '',
        updatedAt:''

      },
      markers1: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers2: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers3: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      
      modalVisible: false
     
    


    };
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
 
  
  componentDidMount() {
    var that =this;
    if(Platform.OS === 'ios'){
      this.MyLocation();
    }else{
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
    
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            
            
    
            
          ]);
          //console.log(PermissionsAndroid.RESULTS.GRANTED);
          return that.MyLocation();
        } catch (err) {
          
          console.warn(err)
        }
      }
      requestLocationPermission();
    } 
    this.Fetch_Bus__Location_1();
    this.Fetch_Bus__Location_2();
    this.Fetch_Bus__Location_3();

    setInterval(() => this.Fetch_Bus__Location_1() , 10000);
    setInterval(() => this.Fetch_Bus__Location_2() , 10000);
    setInterval(() => this.Fetch_Bus__Location_3() , 10000);
    
    
    
  }
  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
    clearInterval(this.interval);
  }



  Fetch_Bus__Location_1 (){
     
    fetch('http://35.197.106.255:3000/api/v1.1/devstat/lastMultiple', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              devid: '9cbf248642fd8a63eef69611227ce1bb'
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             // console.log("RESULTS HERE:", responseData)
             //  this.setState({dataBus1: responseData})
              // console.log(this.state.dataBus1);
               this.setState({dataBus1:{
                battery: responseData.data.battery,
                velocity: responseData.data.velocity,
                button_press: responseData.data.button_press ,
                id : responseData.data.id,
                latitude : responseData.data.latitude,
                longitude : responseData.data.longitude,
                power_good:responseData.data.power_good,
                rssi : responseData.data.rssi,
                createdAt: new Date(`${responseData.data.createdAt}`).toLocaleString("en-UK", {timeZone: 'Asia/Kolkata'}),
                updatedAt: new Date(`${responseData.data.updatedAt}`).toLocaleString("en-UK", {timeZone: 'Asia/Kolkata'})
               }})
               //console.log(this.state.dataBus1);
             /*  const  coordinate1 = {
                latitude : responseData.data.latitude,
                longitude : responseData.data.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }
            
             this.setState({
              markers: [ this.state.markers[0].coordinates, coordinate1 ]
            })*/
            this.setState({
              markers1: {
                latitude: responseData.data.latitude,
                longitude: responseData.data.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }
            });
           // alert(this.state.markers1);
            
      })
      .catch((error) =>{
        console.error(error);
      }) 
};
Fetch_Bus__Location_2 (){
     
  fetch('http://35.197.106.255:3000/api/v1.1/devstat/lastMultiple', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            devid: '87d25631aec6dc72916c395b0e4ba7cf'
          })
      })

          .then((response) => response.json())
          .then((responseData) => {
           
             this.setState({dataBus2:{
              battery: responseData.data.battery,
              velocity: responseData.data.velocity,
              button_press: responseData.data.button_press ,
              id : responseData.data.id,
              latitude : responseData.data.latitude,
              longitude : responseData.data.longitude,
              power_good:responseData.data.power_good,
              rssi : responseData.data.rssi,
              createdAt: new Date(`${responseData.data.createdAt}`).toLocaleString("en-UK", {timeZone: 'Asia/Kolkata'}),
              updatedAt: new Date(`${responseData.data.updatedAt}`).toLocaleString("en-UK", {timeZone: 'Asia/Kolkata'})
             }})
            // console.log(this.state.dataBus2);
             this.setState({
              markers2: {
                latitude: responseData.data.latitude,
                longitude: responseData.data.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }
            });
         
    })
    .catch((error) =>{
      console.error(error);
    }) 
};
Fetch_Bus__Location_3 (){
     
  fetch('http://35.197.106.255:3000/api/v1.1/devstat/lastMultiple', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            devid: 'dfe595c3ab905cf2e9fed5a24899114a'
          })
      })

          .then((response) => response.json())
          .then((responseData) => {
           
             this.setState({dataBus3:{
              battery: responseData.data.battery,
              velocity: responseData.data.velocity,
              button_press: responseData.data.button_press ,
              id : responseData.data.id,
              latitude : responseData.data.latitude,
              longitude : responseData.data.longitude,
              power_good:responseData.data.power_good,
              rssi : responseData.data.rssi,
              createdAt: new Date(`${responseData.data.createdAt}`).toLocaleString("en-UK", {timeZone: 'Asia/Kolkata'}),
              updatedAt: new Date(`${responseData.data.updatedAt}`).toLocaleString("en-UK", {timeZone: 'Asia/Kolkata'})
             }})
             
           //  console.log(this.state.dataBus3);
             this.setState({
              markers3: {
                latitude: responseData.data.latitude,
                longitude: responseData.data.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }
            });

    })
    .catch((error) =>{
      console.error(error);
    }) 
};

  

  MyLocation(){
    
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = Geolocation.watchPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      }
    );
  }

  onRegionChanges(region) {
   
    this.setState({region});
  }
 
  

  
 
  render() {
 console.log('me' + this.state.region.latitude +"  "+ this.state.region.longitude);
 //console.log(this.state.markers2);
// console.log(this.state.markers3);

 const { modalVisible } = this.state;
 

 let modal = (
   <Modal
   animationType="slide"
   transparent={true}
   visible={modalVisible}
   onRequestClose={() => {
     Alert.alert("Modal has been closed.");
     this.setModalVisible(!modalVisible);
   }}
 >
   <View style={styles.centeredView}>
     <View style={styles.modalView}>
          <Text style={styles.head1}>DISPLAY BUS ROUTE DETAILS</Text>
          
          <Text style={styles.head2}>BUS 1</Text>
          <Text>ID :{this.state.dataBus1.id}</Text>
          <Text>LATITUDE :{this.state.dataBus1.latitude}</Text>
          <Text>LONGITUDE :{this.state.dataBus1.longitude}</Text>
          <Text>VELOCITY :{this.state.dataBus1.velocity}</Text>
          <Text>BATTERY :{this.state.dataBus1.battery}</Text>
          <Text>UPDATED_AT :{this.state.dataBus1.updatedAt}</Text>
          <Text>CREATED_AT :{this.state.dataBus1.createdAt}</Text>
          
          <Text style={styles.head2}>BUS 2</Text>
          <Text>ID :{this.state.dataBus2.id}</Text>
          <Text>LATITUDE :{this.state.dataBus2.latitude}</Text>
          <Text>LONGITUDE :{this.state.dataBus2.longitude}</Text>
          <Text>VELOCITY :{this.state.dataBus2.velocity}</Text>
          <Text>BATTERY :{this.state.dataBus2.battery}</Text>
          <Text>UPDATED_AT :{this.state.dataBus2.updatedAt}</Text>
          <Text>CREATED_AT :{this.state.dataBus2.createdAt}</Text>
          
          <Text style={styles.head2}>BUS 3</Text>
          <Text>ID :{this.state.dataBus3.id}</Text>
          <Text>LATITUDE :{this.state.dataBus3.latitude}</Text>
          <Text>LONGITUDE :{this.state.dataBus3.longitude}</Text>
          <Text>VELOCITY :{this.state.dataBus3.velocity}</Text>
          <Text>BATTERY :{this.state.dataBus3.battery}</Text>
          <Text>UPDATED_AT :{this.state.dataBus3.updatedAt}</Text>
          <Text>CREATED_AT :{this.state.dataBus3.createdAt}</Text>

       <Pressable
         style={[ styles.buttonClose]}
         onPress={() => this.setModalVisible(!modalVisible)}
       >
         <Text style={styles.textStyle}>Hide Modal</Text>
       </Pressable>
     </View>
   </View>
 </Modal>
  )

    return (
      <View style={styles.container}>
      
      <Image source={require('./assets/logo.jpg') } style={styles.logo3}/>
      <Image source={require('./assets/logo.jpg') } style={styles.logo4}/>
    
        {modal}
        <MapView
        provider={ PROVIDER_GOOGLE }
        style={styles.map}
        showsUserLocation={true}
        followUserLocation={true}
        zoomEnabled={true}
        region={ this.state.region }

       //onRegionChange={this.onRegionChanges}
        //onRegionChangeComplete={ region => this.setState({region}) }
      >
       
     
  <MapView.Marker
      
      coordinate={this.state.markers1}
      title={'Bus1'}
    />
    <MapView.Marker
      
      coordinate={this.state.markers2}
      title={'Bus2'}
    />
    <MapView.Marker
      
      coordinate={this.state.markers3}
      title={'Bus3'}
    />
    
    
    
    
  
      </MapView> 
    
    <View style={{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
       
      height:'50%',
      
    }}>
    <View style={{
      flex:1,
      flexDirection: 'column',
     // justifyContent: 'center',
      alignItems: 'flex-start',
     
      height:'80%',
    }}>
    <View style={styles.leftView}><View style={[{backgroundColor:'#dfa8c2'},styles.activity]}></View><Text style={styles.text3}>19</Text><Text style={styles.text4}>min</Text></View>
    <View style={styles.leftView}><View style={[{backgroundColor:'#f09693'},styles.activity]}></View><Text style={styles.text3}>13</Text><Text style={styles.text4}>min</Text></View>
    <View style={styles.leftView}><View style={[{backgroundColor:'#a0beea'},styles.activity]}></View><Text style={styles.text3}>05</Text><Text style={styles.text4}>min</Text></View>
    
    </View>
    <View style={{
      flex:1,
      flexDirection: 'column',
     // justifyContent: 'center',
      alignItems: 'flex-end',
      height:'80%',
     
      
    }}>
    <TouchableOpacity style={[{backgroundColor:'#dfa8c2'},styles.button]} onPress={() => this.setModalVisible(true)}><Image source={require('./assets/placeholder.png') } style={styles.logo1}/><Text style={styles.text1}>Tram</Text><Text style={styles.text2}>165</Text><Image source={require('./assets/tram.png') } style={styles.logo2}/></TouchableOpacity>
    <TouchableOpacity style={[{backgroundColor:'#f09693'},styles.button]} onPress={() => this.setModalVisible(true)}><Image source={require('./assets/placeholder.png') } style={styles.logo1}/><Text style={styles.text1}>Bus</Text><Text style={styles.text2}>120</Text><Image source={require('./assets/bus.png') } style={styles.logo2}/></TouchableOpacity>
    <TouchableOpacity style={[{backgroundColor:'#a0beea'},styles.button]} onPress={() => this.setModalVisible(true)}><Image source={require('./assets/placeholder.png') } style={styles.logo1}/><Text style={styles.text1}>Trolly Bus</Text><Text style={styles.text2}>20</Text><Image source={require('./assets/trolley-bus.png') } style={styles.logo2}/></TouchableOpacity>
    </View>
    
    
    </View>
    

    
   

      </View>
    );
  }
  
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    ...StyleSheet.absoluteFillObject,
   height :'100%',
   width: '100%',
   


    

  },
  
  map:{
    flex:1,
    height: '50%',
    width: '80%',
    alignSelf : 'center',
    margin : 20,
    marginTop:'20%',
    
    
   
  },
  button:{
    width:'100%',
    height: '25%',
    borderRadius:10,
    borderWidth:0.5,
    borderColor:'#2a2a2a',
    margin:10
   
    
    
  },
  activity:{
    flex:1,
    height:10,
    width:10,
    position:'absolute',
    left:15,
    top:'35%',
    borderRadius: 50,
    
  },
  
  leftView:{
    flex:1,
    margin:10,
    marginLeft:20,
    borderRadius:10,
    
  },
  text1:{
  
    position:'relative',
    marginTop:'4%',
    fontSize:17,
    fontWeight:'700',
    color:'#2a2a2a',
    marginLeft:'28%',
    
    
    
    


  },
  text2:{
   
    position:'relative',
    marginTop:0,
    fontSize:15,
    fontWeight:'600',
    color:'#2a2a2a',
    marginLeft:'28%'
    
    


  },
  
  text3:{
    
    position:'relative',
    marginTop:'4%',
    fontSize:17,
    fontWeight:'700',
    color:'#2a2a2a',
    marginLeft:'35%'
    
    
    


  },
  
  
  text4:{
   
    position:'relative',
    fontSize:15,
    fontWeight:'600',
    color:'#2a2a2a',
    marginLeft:'35%'
    
    


  },
  
  logo1:{
    
    position:'absolute',
    marginTop:'5%',
    height:'60%',
    width:'20%',

    left: 5
    
    
    
  },
  logo2:{
    
    position:'absolute',
    marginTop:'5%',
    height:'50%',
    width:'20%',
    right:5,
    
    
    
  },
  logo3:{
   
    position:'absolute',
    height:'7%',
    width:'14%',
    right:0,
    margin:'1%'
    
    
  },
  logo4:{
   
    position:'absolute',
    height:'7%',
    width:'14%',
    left:0,
    margin:'1%',
    borderRadius:100
    
    
    
  },
  /////////////////////
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    height:40,
    width: width/2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginTop:8
  },
  head1:{
    backgroundColor:'#ad2831',
    padding:10,
    color:'#fff'

  },
  head2:{
    backgroundColor:'#000',
    padding:10,
    color:'#fff',
    margin:10

  }
  

});