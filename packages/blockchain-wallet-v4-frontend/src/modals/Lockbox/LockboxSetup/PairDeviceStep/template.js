import React from 'react'
import styled from 'styled-components'
import { FormattedHTMLMessage } from 'react-intl'
import { reduxForm, Field } from 'redux-form'

import { required } from 'services/FormHelper'
import { CheckBox, Form, FormGroup, FormItem } from 'components/Form'
import {
  Button,
  Icon,
  Image,
  Link,
  Text,
  TextGroup
} from 'blockchain-info-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`
const IntroText = styled(Text)`
  margin: 20px 0 30px;
`
const InstallReminderText = styled(Text)`
  margin: 20px 0 40px;
`
const ClickableText = styled(Text)`
  color: ${props => props.theme['brand-secondary']};
  cursor: pointer;
`
const AppManagerLink = styled(ClickableText)`
  margin: 0 -1px 0 -2px;
  font-weight: 400;
`
const TimeoutHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-bottom: 25px;
`
const SupportText = styled(Link)`
  margin: 35px 0 8px;
`
const ContactSupportText = styled(TextGroup)`
  margin: 24px 0 8px;
`
const SupportListItem = styled(FormItem)`
  display: flex;
  margin-bottom: 8px;
`
const CheckboxLabel = styled.label`
  margin-top: 3px;
  margin-left: 12px;
`
const PairDeviceStep = props => {
  const {
    btcOpenTimeout,
    deviceType,
    invalid,
    isReady,
    onTimeoutAccept,
    onStepChange,
    supportLink
  } = props

  return btcOpenTimeout ? (
    <Wrapper>
      <TimeoutHeader>
        <Icon name='pending' weight='400' size='40px' color='warn' />
        <Text size='20px' weight={400} style={{ marginTop: '8px' }}>
          <FormattedHTMLMessage
            id='modals.lockboxsetup.pairdevice.timeout.header'
            defaultMessage='Are you having issues?'
          />
        </Text>
        <Text size='15px' weight={300} style={{ marginTop: '4px' }}>
          <FormattedHTMLMessage
            id='modals.lockboxsetup.pairdevice.timeout.subheader'
            defaultMessage='Ensure the following items are completed:'
          />
        </Text>
      </TimeoutHeader>
      <Form>
        <FormGroup>
          <SupportListItem>
            <Field
              name='connected'
              validate={[required]}
              component={CheckBox}
              hideErrors
            />
            <CheckboxLabel>
              <Text size='12px' weight={300}>
                <FormattedHTMLMessage
                  id='modals.lockboxsetup.pairdevice.timeout.issue1'
                  defaultMessage='My device is connected with the supplied USB cable.'
                />
              </Text>
            </CheckboxLabel>
          </SupportListItem>
          <SupportListItem>
            <Field
              name='installed'
              validate={[required]}
              component={CheckBox}
              hideErrors
            />
            <CheckboxLabel>
              <TextGroup inline>
                <Text size='12px' weight={300}>
                  <FormattedHTMLMessage
                    id='modals.lockboxsetup.pairdevice.timeout.issue2.part1'
                    defaultMessage='I have installed the Bitcoin app. If you do not have the app installed, click'
                  />
                </Text>
                <AppManagerLink
                  size='12px'
                  weight={300}
                  onClick={() => onStepChange('app-manager-step')}
                >
                  <FormattedHTMLMessage
                    id='modals.lockboxsetup.pairdevice.timeout.issue2.part2'
                    defaultMessage='here'
                  />
                </AppManagerLink>
                <Text size='12px' weight={300}>
                  <FormattedHTMLMessage
                    id='modals.lockboxsetup.pairdevice.timeout.issue2.part3'
                    defaultMessage='to install it.'
                  />
                </Text>
              </TextGroup>
            </CheckboxLabel>
          </SupportListItem>
          <SupportListItem>
            <Field
              name='opened'
              validate={[required]}
              component={CheckBox}
              hideErrors
            />
            <CheckboxLabel>
              <Text size='12px' weight={300}>
                <FormattedHTMLMessage
                  id='modals.lockboxsetup.pairdevice.timeout.issue3'
                  defaultMessage='The Bitcoin app is open on my device. Use the top buttons to scroll left or right to the Bitcoin app. Then press the top two buttons to open the app.'
                />
              </Text>
            </CheckboxLabel>
          </SupportListItem>
        </FormGroup>
      </Form>
      <ContactSupportText inline>
        <Text size='11px' weight={300}>
          <FormattedHTMLMessage
            id='modals.lockboxsetup.pairdevice.timeout.support'
            defaultMessage='Completed the above and still having issues?'
          />
        </Text>
        <SupportText
          href={supportLink}
          target='_blank'
          size='11px'
          weight={400}
        >
          <FormattedHTMLMessage
            id='modals.lockboxsetup.pairdevice.timeout.supportlink'
            defaultMessage='Contact Support'
          />
        </SupportText>
      </ContactSupportText>
      <Button
        fullwidth
        type='submit'
        disabled={invalid}
        onClick={onTimeoutAccept}
        nature='primary'
      >
        <FormattedHTMLMessage
          id='modals.lockboxsetup.pairdevice.timeout.retry'
          defaultMessage='Retry Pairing'
        />
      </Button>
    </Wrapper>
  ) : (
    <Wrapper>
      <Image
        style={{ marginBottom: '18px' }}
        name='lockbox-onboard-pairdevice'
        width='100%'
      />
      <IntroText size='13px' weight={300}>
        <FormattedHTMLMessage
          id='modals.lockboxsetup.pairdevice.intro'
          defaultMessage='Open the Bitcoin app on your {deviceType}. This will pair your device with your Blockchain wallet so that you can always view the balance of your Lockbox.'
          values={{ deviceType }}
        />
      </IntroText>
      <TextGroup inline style={{ marginBottom: '10px' }}>
        <InstallReminderText size='11px' weight={300}>
          <FormattedHTMLMessage
            id='modals.lockboxsetup.pairdevice.install'
            defaultMessage="Don't have the Bitcoin app on your {deviceType}? Install it"
            values={{ deviceType }}
          />
        </InstallReminderText>
        <ClickableText
          size='11px'
          onClick={() => onStepChange('app-manager-step')}
        >
          <FormattedHTMLMessage
            id='modals.lockboxsetup.pairdevice.here'
            defaultMessage='here.'
          />
        </ClickableText>
      </TextGroup>
      <Button
        fullwidth
        disabled={!isReady}
        nature={isReady ? 'primary' : 'dark'}
        onClick={() => onStepChange('finish-step')}
      >
        {isReady ? (
          <FormattedHTMLMessage
            id='modals.lockboxsetup.openbtcappstep.success'
            defaultMessage='Success! Click to Continue'
          />
        ) : (
          <FormattedHTMLMessage
            id='modals.lockboxsetup.openbtcappstep.waiting'
            defaultMessage='Waiting...'
          />
        )}
      </Button>
    </Wrapper>
  )
}
export default reduxForm({ form: 'pairLockboxChecklist' })(PairDeviceStep)