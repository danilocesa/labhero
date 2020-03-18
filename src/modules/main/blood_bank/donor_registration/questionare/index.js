import React from 'react';
import { Form, Input, Row, Col, Typography, DatePicker, Radio, Divider, Select } from 'antd';

// CUSTOM MODULES
import FormButtons from './form_buttons';
import PageTitle from 'shared_components/page_title';

import './form.css';

// CONSTANTS
const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const DescriptionItem = ({ title }) => (
	<div>
	  <Text strong style= {{ color: '#404040' }}>
		{title}
	  </Text>
	</div>
);

class Questionare extends React.Component{
    state = {
        value: 1,
    };
    
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
    };

    render(){
        return(
            <div>
                <PageTitle pageTitle="DONOR QUESTIONARE" />
                <div style={{ marginTop: '5px' }}>
                    <Form className="fillup-form">
                        <div>
                            <Row gutter={12}>
                                <Col span={24}>
                                    <div style={{ padding: '10px 0px', textAlign : 'center'}}>
                                        <Text strong>WELLNESS</Text>
                                    </div>
                                    <div style={{ padding: '10px 0px' }}>
                                        <Text strong>The following questions ask about your wellness today.</Text>
                                    </div>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="1. Are you feeling well today?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="2. Do you have a _________?" />
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="a. Flu" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="b. Sore Throat" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="c. Fever" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="d. Infection" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>




                                    <div style={{ padding: '10px 0px', textAlign : 'center' }}>
                                        <Text strong>DRUGS, VACCINES</Text>
                                    </div>
                                    <div style={{ padding: '10px 0px' }}>
                                        <Text strong>The following questions ask about medications and shots you may have taken.</Text>
                                    </div>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="1. In the last 3 days have you taken medication (including Aspirin), other than birth control pills or vitamins?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="2. In the last month have you taken any of the following medications?" />
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="a. Accutane" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="b. Epuris" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="c. Clarus" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="d. Isotretinoin" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="e. Toctino" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="f. Hanzema" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="g. Alitretinoin" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="h. Proscar" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="i. Propecia" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="j. Finasteride" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="3. In the last 3 months have you had a vaccination?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="4. In the last 4 months have you taken any medication to prevent HIV infection such as pre-exposure prophylaxis (PrEP) or post-exposure prophylaxis (PEP)?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="5. In the last 6 months have you taken any of the following medications?" />
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="a. Avodart" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="b. Jalyn" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="c. Dutasteride" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="6. In the last 12 months have you had a rabies shot or a shot for exposure to hepatitis B?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="7. Have you ever taken any of the following medications?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="7. Have you ever taken any of the following medications?" />
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="a. Tegison" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="b. Soriatane" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="c. Human pituitary growth hormone" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>

                                    <div style={{ padding: '10px 0px', textAlign : 'center' }}>
                                        <Text strong>GENERAL MEDICAL</Text>
                                    </div>
                                    <div style={{ padding: '10px 0px' }}>
                                        <Text strong>The following questions are about your medical history</Text>
                                    </div>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="1. Do you have diabetes?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="2. In the last 3 days have you had dental work?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="3. In the last 6 months have you consulted a doctor for a health problem, had surgery or medical treatment?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="4. In the last 6 months have you been pregnant? (female donors)" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="5. In the last 6 months have you had hepatitis?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="6. In the last 6 months have you received blood or blood products?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="7. In the last 12 months have you had a graft?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="8. In the last 12 months have you had close contact with a person who has had hepatitis or yellow jaundice?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="9. Have you ever had malaria?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="10. Have you ever been pregnant, miscarried or had an abortion? (female plasma/platelet donors)" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="11. Have you ever had a positive test for the HIV/AIDS virus?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="12. Have you ever had epilepsy or fainting?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="13. Have you ever had a coma or stroke?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="14. Have you ever had problems with your heart or lungs?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="15. Have you ever had kidney or blood problems?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="16. Have you ever had cancer?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="17. Have you ever had Crohn’s disease?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="18. Have you ever received a dura mater (brain covering) graft?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="19. Have you ever had Chagas' disease, Babesiosis or Leishmaniasis?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="20. Do you have a biological (blood relative) parent, child or sibling diagnosed with Creutzfeldt-Jakob Disease (CJD)?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>

                                    <div style={{ padding: '10px 0px', textAlign : 'center' }}>
                                        <Text strong>LIFESTYLE</Text>
                                    </div>
                                    <div style={{ padding: '10px 0px' }}>
                                        <Text strong>The following questions are lifestyle related questions</Text>
                                    </div>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="1. In the last 3 months have you had a tattoo?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="2. In the last 3 months have you had skin or ear piercing?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="3. In the last 3 months have you had sex with a man who, in the last 12 months, had sex with another man? (Female)" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="4. In the last 3 months, have you had sex with a man? (Male)" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="5. In the last 6 months have you had acupuncture?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="6. In the last 6 months have you had electrolysis?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="7. In the last 6 months have you had an injury from a needle or come in contact with someone else's blood?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="8. In the last 12 months have you taken illegal steroids with a needle?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="9. In the last 12 months have you had or been treated for syphilis or gonorrhea?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="10. In the last 12 months have you been in jail or prison?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="11. In the last 12 months have you used cocaine?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="12. In the last 12 months have you had sex with a sex trade worker or anyone else who has taken money or drugs for sex?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="13. In the last 12 months have you had sex with anyone who has ever taken illegal drugs with a needle?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="14. In the last 12 months, have you had sex with anyone who has HIV/AIDS or has tested positive for HIV/AIDS virus?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="15. At any time since 1977 have you taken money or drugs for sex?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                    <Col style = {{ marginTop: '10px' }}>
                                        <div>
                                            <DescriptionItem title="16. Have you ever taken illegal drugs with a needle even one time?" />
                                        </div>
                                        <div>
                                            <Radio.Group name="radiogroup">
                                                <Radio value={1}>YES</Radio>
                                                <Radio value={2}>NO</Radio>
                                            </Radio.Group>
                                        </div>
                                    </Col>
                                </Col>
                            </Row>
                            <Row>
                                <FormButtons />
                            </Row>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Questionare;