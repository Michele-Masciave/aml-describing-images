import '../App.css';
import ArtPainting from '../images/art_painting_images.json'
import Cartoon from '../images/cartoon_images.json'
import Photo from '../images/photo_images.json'
import Sketches from '../images/sketch_images.json'
import {Image, Carousel, Container, Row, Col, Button, Form, Alert, Badge, Accordion} from 'react-bootstrap'
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

    const [details, setDetails] = useState([])
    const [edges, setEdges] = useState([])
    const [saturation, setSaturation] = useState([])
    const [shades, setShades] = useState([])
    const [background, setBackground] = useState([])
    const [instances, setInstances] = useState([])
    const [text, setText] = useState([])
    const [texture, setTexture] = useState([])
    const [perspective, setPerspective] = useState([])

    const [alert, setAlert] = useState(false)
    const [index, setIndex] = useState(0);
    const [domain, setDomain] = useState(ArtPainting);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(ArtPainting.length-1);

    const resetFeatures = () => {
        //reset
        setDetails([])
        setEdges([])
        setShades([])
        setSaturation([])
        setBackground([])
        setInstances([])
        setText([])
        setTexture([])
        setPerspective([])
    }

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        //reset
        resetFeatures();
    };

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
        const current_text = text;
        if(!text.includes(label) && label !== "")
            setText([...current_text, label])
        else
            setEdges(current_text.filter(e => e !== label))
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
        if (details.length > 0 && edges.length > 0 && saturation.length > 0 && shades.length > 0 && background.length > 0 && instances.length > 0 && text.length > 0 && texture.length > 0 && perspective.length > 0) {
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
            setAlert(true)
            setTimeout(() => setAlert(false), 5000);
        } else {
            window.alert('Fill all fields!')
        }
    }


    return (
        <>
        <br></br>
        <br></br>
        <Container>
            <Form.Check defaultChecked type="radio" label="ArtPainting" name="group00" inline onChange={()=>{setDomain(ArtPainting); setStart(0); setEnd(ArtPainting.length-1)}} />
            <Form.Check type="radio" label="Cartoon" name="group00" inline onChange={()=>{setDomain(Cartoon); setStart(0); setEnd(Cartoon.length-1)}}  />
            <Form.Check type="radio" label="Photo" name="group00" inline onChange={()=>{ setDomain(Photo); setStart(0); setEnd(Photo.length-1)}}  />
            <Form.Check type="radio" label="Sketches" name="group00" inline onChange={()=>{ setDomain(Sketches); setStart(0); setEnd(Sketches.length-1)}}  />
            <div style={{display: 'inline-block'}}>
                <Form.Control defaultValue={0} size="sm" placeholder="from" className="App-number" onChange={(e) => setStart(e.target.value)}/>
            </div>
            {' '}
            <div style={{display: 'inline-block'}}>
                <Form.Control defaultValue={domain.length} size="sm" placeholder="to" className="App-number" onChange={(e) => setEnd(e.target.value)}/>
            </div>
        </Container>
        <br></br>
        <br></br>
        <Carousel variant="light" indicators={false} interval={null} style={{width: '100%'}} activeIndex={index} onSelect={handleSelect}>{
            domain.slice(start,end).map((image, index) => {
                return (
                    <Carousel.Item key={index}>
                        <Container className='App-container'>
                            <Row>
                                <Col xs={3}>
                                    <Image className="App-photo" src={`./PACS/kfold/${image.image_name}`} alt={image.image_name} />
                                    <small>{image.image_name}</small>
                                </Col>
                                <Col xs={3}>
                                    <h5>details</h5>
                                    <Form>
                                        {Details.map(el => {
                                        return(
                                            <Form.Check
                                            name={"group1"+index}
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
                                            name={"group2"+index}
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
                                            name={"group3"+index}
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
                                        name={"group4"+index}
                                        type='radio'
                                        label={el}
                                        id={el}
                                        onChange={(e) => handleShades(e.target.id)}
                                    />
                                    )})}
                                    <Form.Control defaultValue={""} id={"custom_shade"+index} name={"group4"+index} size="sm" placeholder="[color]scale shades"/>
                                    <Button size='sm' variant={'outline-warning'} onClick={() => handleShades(document.getElementById("custom_shade"+index).value)}>Add</Button>
                                    </Form> 
                                    <hr style={{backgroundColor: 'transparent'}}></hr>     
                                    <h5>background</h5>
                                    <Form>
                                    {Background.map(el => {
                                    return(
                                        <Form.Check
                                        name={"group5"+index}
                                        type='checkbox'
                                        label={el}
                                        id={el}
                                        onChange={(e) => handleBackground(e.target.id)}
                                    />
                                    )})}
                                    <Form.Control name={"group5"+index} id={"custom_background"+index} size="sm" placeholder="[color] background" />
                                    <Button size='sm' variant={'outline-warning'} onClick={(e) => handleBackground(document.getElementById("custom_background"+index).value)}>Add</Button>
                                    </Form>  
                                    <hr style={{backgroundColor: 'transparent'}}></hr>     
                                    <h5>single instance</h5>
                                    <Form>
                                    {Instance.map(el => {
                                    return(
                                        <Form.Check
                                        name={"group6"+index}
                                        type='radio'
                                        label={el}
                                        id={el}
                                        onChange={(e) => handleInstances(e.target.id)}
                                    />
                                    )})}
                                    </Form>
                                    <Form.Control defaultValue={""} id={"custom_instances"+index} name={"group6"+index} size="sm" placeholder="[num] instances" />
                                    <Button size='sm' variant={'outline-warning'} onClick={() => handleInstances(document.getElementById("custom_instances"+index).value)}>Add</Button>
                                    <hr style={{backgroundColor: 'transparent'}}></hr>     
                                    <h5>text</h5>
                                    <Form>
                                    {Text.map(el => {
                                    return(
                                        <Form.Check
                                        name={"group7"+index}
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
                                        name={"group8"+index}
                                        type='checkbox'
                                        label={el}
                                        id={el}
                                        onChange={(e) => handleTexture(e.target.id)}
                                    />
                                    )})}
                                    <Form.Control name={"group8"+index} id={"custom_texture"+index} size="sm" placeholder="[pattern] pattern" />
                                    <Button size='sm' variant={'outline-warning'} onClick={(e) => handleTexture(document.getElementById("custom_texture"+index).value)}>Add</Button>
                                    </Form> 
                                    <hr style={{backgroundColor: 'transparent'}}></hr>     
                                    <h5>prespective</h5>
                                    <Form>
                                    {Perspective.map(el => {
                                    return(
                                        <Form.Check
                                        name={"group9"+index}
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
                                <Col xs={2}></Col>
                                <Col xs={2}>
                                    <Button size={'md'} variant={'outline-light'} onClick={() => onSubmit(image.image_name)}>Confirm</Button>
                                    <Button size={'md'} variant={'outline-danger'} style={{marginLeft: 30}} onClick={() => resetFeatures()}>Reset</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Carousel.Item>
                );
            })
        }</Carousel>
        <br></br>
        {alert ? <Alert variant='success'>Description added with success.</Alert> : <></>}
        <br></br>
        <br></br>
        <Container>
            <small>{'details: '}</small>
            {details.map(e => <Badge pill bg="primary">{e}</Badge>)}
            <br></br>
            <small>{'edges: '}</small>
            {edges.map(e => <Badge pill bg="secondary">{e}</Badge>)}
            <br></br>
            <small>{'saturation: '}</small>
            {saturation.map(e => <Badge pill bg="success">{e}</Badge>)}
            <br></br>
            <small>{'shades: '}</small>
            {shades.map(e => <Badge pill bg="danger">{e}</Badge>)}
            <br></br>
            <small>{'background: '}</small>
            {background.map(e => <Badge pill bg="warning" text="dark">{e}</Badge>)}
            <br></br>
            <small>{'instances: '}</small>
            {instances.map(e => <Badge pill bg="info">{e}</Badge>)}
            <br></br>
            <small>{'text: '}</small>
            {text.map(e => <Badge pill bg="light" text="dark">{e}</Badge>)}
            <br></br>
            <small>{'texture: '}</small>
            {texture.map(e => <Badge pill bg="dark">{e}</Badge>)}
            <br></br>
            <small>{'perspective: '}</small>
            {perspective.map(e => <Badge pill bg="primary">{e}</Badge>)}
        </Container>
        <br></br>
        <Button size={'lg'} variant={'danger'} onClick={() => props.writeDescriptions()}>Save</Button>
        <br></br>
        <br></br>
        <Container className="App-resume">
            <h5 style={{color: 'white'}}>Descriptions:</h5>
            <Accordion>
                {props.desc.map((d,index) =>
                    <>
                        <Accordion.Item eventKey={index}>
                            <Accordion.Header>{d.image_name}</Accordion.Header>
                            <Accordion.Body>
                                {JSON.stringify(d)}
                            </Accordion.Body>
                        </Accordion.Item>
                    </>
                )}
            </Accordion>
        </Container>
        <br></br>
        </>
    );
}