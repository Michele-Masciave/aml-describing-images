import '../App.css';
import ArtPainting from '../images/art_painting_images.json'
import Cartoon from '../images/cartoon_images.json'
import Photo from '../images/photo_images.json'
import Sketches from '../images/sketch_images.json'
import {Image, Carousel, Container, Row, Col, Button, Form} from 'react-bootstrap'
import {useState} from 'react'

export default function CarouselCompoent(props) {
    const Details = ['low level details', 'mid level details', 'high level details']
    const Edges = ['well defined outlines', 'defined outlines', 'not well defined outlines', 'precise lines', 'imprecise lines', 'continuous lines', 'dashed lines', 'broken lines', 'dotted lines', 'heavy lines', 'light lines', 'sharp lines', 'open outlines', 'close outlines'];
    const Saturation = ['no saturation',  'strong saturation', 'mid saturation', 'weak saturation'];
    const Shades = ['no shades', 'monochrome', 'colorful shades'];
    const Background = ['colorful background', 'monochrome', 'detailed background']    
    const Instance = ['single instance', 'multiple instances'];
    const Text = ['no text', 'generic text', 'signature', 'brand', 'link'];
    const Texture = ['no texture', 'painting texture', 'spiral texture', 'round texture'];
    const Perspective = ['realistic', 'semi realistic', 'unrealistic'];

    function Mymsg(msg,duration) {
        var alt = document.createElement("div");
        alt.setAttribute("style","position:absolute;top:50%;left:50%;background-color:green;color:white");
        alt.innerHTML = msg;
        setTimeout(function(){
        alt.parentNode.removeChild(alt);
        },duration);
        document.body.appendChild(alt);
    }

    const [details, setDetails] = useState([])
    const [edges, setEdges] = useState([])
    const [saturation, setSaturation] = useState([])
    const [shades, setShades] = useState([])
    const [background, setBackground] = useState([])
    const [instances, setInstances] = useState([])
    const [text, setText] = useState([])
    const [texture, setTexture] = useState([])
    const [perspective, setPerspective] = useState([])

    const handleDetails = (label) => {
        setDetails([label])
    }

    const handleEdges = (label) => {
        const current_edges = edges;
        if(!edges.includes(label) && label !== "")
            setEdges([...current_edges, label])
        else
            setEdges(current_edges.filter(e => e !== label))
    }

    const handleSaturation = (label) => {
        setSaturation([label])
    }

    const handleShades = (label) => {
        setShades([label])
    }

    const handleBackground = (label) => {
        const current = background;
        if(!background.includes(label) && label !== "")
            setBackground([...current, label])
        else
            setBackground(current.filter(e => e !== label))
    }

    const handleInstances = (label) => {
        setInstances([label])
    }

    const handleText = (label) => {
        setText([label])
    }

    const handleTexture = (label) => {
        const current = texture;
        if(!texture.includes(label) && label !== "")
            setTexture([...current, label])
        else
            setTexture(current.filter(e => e !== label))
    }

    const handlePerspective = (label) => {
        setPerspective([label])
    }

    const onSubmit = (img_name) => {
    let currentImage = {
            image_name: img_name,
            details: details.join(", "),
            edges: edges.join(", "),
            color_saturation: saturation.join(", "),
            color_shades: shades.join(", "),
            background: background.join(", "),
            single_instance: instances.join(", "),
            text: text.join(", "),
            texture: texture.join(", "),
            perspective: perspective.join(", "),
        }
        props.addDescription(currentImage)
        Mymsg('Description added with success', 3000)
    }


    return (
        <>
        <Carousel variant="light" indicators={false} interval={null} style={{width: '100%'}}>{
            ArtPainting. //change me to the domain
            slice(2,4). //change with the range (NB: count starts from 0)
            map((image, index) => {
                return (
                    <Carousel.Item key={index}>
                        <Container className='App-container'>
                            <Row>
                                <Col xs={3}>
                                    <Image className="App-photo" src={`./PACS/kfold/${image.image_name}`} alt="" />
                                </Col>
                                <Col xs={3}>
                                    <h5>details</h5>
                                    <Form>
                                        {Details.map(el => {
                                        return(
                                            <Form.Check
                                            name="group1"
                                            type='radio'
                                            label={el}
                                            id={el}
                                            onChange={(e) => handleDetails(e.target.id)}
                                        />
                                        )})}
                                    </Form>
                                    <hr style={{backgroundColor: 'transparent'}}></hr>
                                    <h5>edges</h5>
                                    <Form>
                                        {Edges.map(el => {
                                        return(
                                            <Form.Check
                                            name="group2"
                                            type='checkbox'
                                            label={el}
                                            id={el}
                                            onChange={(e) => handleEdges(e.target.id)}
                                        />
                                        )})}
                                    </Form>
                                    <hr style={{backgroundColor: 'transparent'}}></hr>
                                    <h5>saturation</h5>
                                    <Form>
                                        {Saturation.map(el => {
                                        return(
                                            <Form.Check
                                            name="group3"
                                            type='radio'
                                            label={el}
                                            id={el}
                                            onChange={(e) => handleSaturation(e.target.id)}
                                        />
                                        )})}
                                    </Form> 
                                </Col> 
                                <Col xs={3}>
                                    <h5>color shades</h5>
                                    <Form>
                                    {Shades.map(el => {
                                    return(
                                        <Form.Check
                                        name="group4"
                                        type='radio'
                                        label={el}
                                        id={el}
                                        onChange={(e) => handleShades(e.target.id)}
                                    />
                                    )})}
                                    <Form.Control defaultValue={""} id="custom_shade" name="group4" size="sm" placeholder="[color]scale shades"/>
                                    <Button size='sm' variant={'outline-warning'} onClick={() => handleShades(document.getElementById("custom_shade").value)}>Add</Button>
                                    </Form> 
                                    <hr style={{backgroundColor: 'transparent'}}></hr>     
                                    <h5>background</h5>
                                    <Form>
                                    {Background.map(el => {
                                    return(
                                        <Form.Check
                                        name="group5"
                                        type='checkbox'
                                        label={el}
                                        id={el}
                                        onChange={(e) => handleBackground(e.target.id)}
                                    />
                                    )})}
                                    <Form.Control name="group5" id="custom_background" size="sm" placeholder="[color] background" />
                                    <Button size='sm' variant={'outline-warning'} onClick={(e) => handleBackground(document.getElementById("custom_background").value)}>Add</Button>
                                    </Form>  
                                    <hr style={{backgroundColor: 'transparent'}}></hr>     
                                    <h5>single instance</h5>
                                    <Form>
                                    {Instance.map(el => {
                                    return(
                                        <Form.Check
                                        name="group6"
                                        type='radio'
                                        label={el}
                                        id={el}
                                        onChange={(e) => handleInstances(e.target.id)}
                                    />
                                    )})}
                                    </Form>
                                    <Form.Control defaultValue={""} id="custom_instances" name="group6" size="sm" placeholder="[num] instances" />
                                    <Button size='sm' variant={'outline-warning'} onClick={() => handleInstances(document.getElementById("custom_instances").value)}>Add</Button>
                                    <hr style={{backgroundColor: 'transparent'}}></hr>     
                                    <h5>text</h5>
                                    <Form>
                                    {Text.map(el => {
                                    return(
                                        <Form.Check
                                        name="group7"
                                        type='checkbox'
                                        label={el}
                                        id={el}
                                        onChange={(e) => handleText(e.target.id)}
                                    />
                                    )})}
                                    </Form>    
                                </Col> 
                                <Col>
                                    <Form>
                                    <h5>texture</h5>
                                    {Texture.map(el => {
                                    return(
                                        <Form.Check
                                        name="group8"
                                        type='checkbox'
                                        label={el}
                                        id={el}
                                        onChange={(e) => handleTexture(e.target.id)}
                                    />
                                    )})}
                                    <Form.Control name="group8" id="custom_texture" size="sm" placeholder="[pattern] pattern" />
                                    <Button size='sm' variant={'outline-warning'} onClick={(e) => handleTexture(document.getElementById("custom_texture").value)}>Add</Button>
                                    </Form> 
                                    <hr style={{backgroundColor: 'transparent'}}></hr>     
                                    <h5>prespective</h5>
                                    <Form>
                                    {Perspective.map(el => {
                                    return(
                                        <Form.Check
                                        name="group9"
                                        type='radio'
                                        label={el}
                                        id={el}
                                        onChange={(e) => handlePerspective(e.target.id)}
                                    />
                                    )})}
                                    </Form>  
                                </Col>   
                            </Row>
                            <Row>
                                <Col xs={6}></Col>
                                <Col xs={4}></Col>
                                <Col xs={2}>
                                    <Button size={'md'} variant={'outline-light'} onClick={() => onSubmit(image.image_name)}>Confirm</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Carousel.Item>
                );
            })
        }</Carousel>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Button size={'lg'} variant={'danger'} onClick={() => props.writeDescriptions()}>Save</Button>
        </>
    );
}