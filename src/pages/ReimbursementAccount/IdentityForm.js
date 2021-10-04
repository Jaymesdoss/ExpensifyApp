import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import StatePicker from '../../components/StatePicker';
import ExpensiTextInput from '../../components/ExpensiTextInput';
import styles from '../../styles/styles';
import withLocalize, {withLocalizePropTypes} from '../../components/withLocalize';
import {translateLocal} from '../../libs/translate';
import {hideBankAccountErrors} from '../../libs/actions/BankAccounts';
import Text from '../../components/Text';
import CONST from '../../CONST';
import DatePicker from '../../components/DatePicker';


const propTypes = {
    /** Style for wrapping View */
    style: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),

    /** Callback fired when a field changes. Passes args as fieldName, val */
    onFieldChange: PropTypes.func.isRequired,

    /** Form values */
    values: PropTypes.shape({
        /** First name field */
        firstName: PropTypes.string,

        /** Last name field */
        lastName: PropTypes.string,

        /** Address street field */
        street: PropTypes.string,

        /** Address city field */
        city: PropTypes.string,

        /** Address state field */
        state: PropTypes.string,

        /** Address zip code field */
        zipCode: PropTypes.string,

        /** Date of birth field */
        dob: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),

        /** Last 4 digits of SSN */
        ssnLast4: PropTypes.string,
    }),

    /** Any errors that can arise from form validation */
    error: PropTypes.string,

    ...withLocalizePropTypes,
};

const defaultProps = {
    style: {},
    values: {
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        dob: '',
        ssnLast4: '',
    },
    error: '',
};

const IdentityForm = ({
    translate, values, onFieldChange, style, error,
}) => {
    const {
        firstName, lastName, street, city, state, zipCode, dob, ssnLast4,
    } = values;
    return (
        <View style={style}>
            <View style={[styles.flexRow]}>
                <View style={[styles.flex2, styles.mr2]}>
                    <ExpensiTextInput
                        label={`${translate('common.firstName')}`}
                        value={firstName}
                        onChangeText={(val) => {
                            if (error === translateLocal('bankAccount.error.firstName')) {
                                hideBankAccountErrors();
                            }
                            onFieldChange('firstName', val);
                        }}
                        errorText={error === translateLocal('bankAccount.error.firstName') ? error : ''}
                        translateX={-10}
                    />
                </View>
                <View style={[styles.flex2]}>
                    <ExpensiTextInput
                        label={`${translate('common.lastName')}`}
                        value={lastName}
                        onChangeText={(val) => {
                            if (error === translateLocal('bankAccount.error.lastName')) {
                                hideBankAccountErrors();
                            }
                            onFieldChange('lastName', val);
                        }}
                        errorText={error === translateLocal('bankAccount.error.lastName') ? error : ''}
                        translateX={-10}
                    />
                </View>
            </View>
            <DatePicker
                label={`${translate('common.dob')}`}
                containerStyles={[styles.mt4]}
                placeholder={translate('common.dateFormat')}
                value={dob}
                onChange={(val) => {
                    if (error === translateLocal('bankAccount.error.dob')) {
                        hideBankAccountErrors();
                    }
                    onFieldChange('dob', val);
                }}
                errorText={error === translateLocal('bankAccount.error.dob') ? error : ''}
            />
            <ExpensiTextInput
                label={`${translate('common.ssnLast4')}`}
                containerStyles={[styles.mt4]}
                keyboardType={CONST.KEYBOARD_TYPE.NUMERIC}
                value={ssnLast4}
                onChangeText={(val) => {
                    if (error === translateLocal('bankAccount.error.ssnLast4')) {
                        hideBankAccountErrors();
                    }
                    onFieldChange('ssnLast4', val);
                }}
                errorText={error === translateLocal('bankAccount.error.ssnLast4') ? error : ''}
                maxLength={CONST.BANK_ACCOUNT.MAX_LENGTH.SSN}
            />
            <ExpensiTextInput
                label={translate('common.personalAddress')}
                containerStyles={[styles.mt4]}
                value={street}
                onChangeText={(val) => {
                    if (error === translateLocal('bankAccount.error.address')) {
                        hideBankAccountErrors();
                    }
                    onFieldChange('street', val);
                }}
                errorText={error === translateLocal('bankAccount.error.address') ? error : ''}
            />
            <Text style={[styles.mutedTextLabel, styles.mt1]}>{translate('common.noPO')}</Text>
            <View style={[styles.flexRow, styles.mt4]}>
                <View style={[styles.flex2, styles.mr2]}>
                    <ExpensiTextInput
                        label={translate('common.city')}
                        value={city}
                        onChangeText={(val) => {
                            if (error === translateLocal('bankAccount.error.addressCity')) {
                                hideBankAccountErrors();
                            }
                            onFieldChange('city', val);
                        }}
                        errorText={error === translateLocal('bankAccount.error.addressCity') ? error : ''}
                        translateX={-14}
                    />
                </View>
                <View style={[styles.flex1]}>
                    <StatePicker
                        value={state}
                        onChange={(val) => {
                            if (error === translateLocal('bankAccount.error.addressState')) {
                                hideBankAccountErrors();
                            }
                            onFieldChange('state', val);
                        }}
                        errorText={error === translateLocal('bankAccount.error.addressState') ? error : ''}
                        hasError={error === translateLocal('bankAccount.error.addressState')}
                    />
                </View>
            </View>
            <ExpensiTextInput
                label={translate('common.zip')}
                containerStyles={[styles.mt4]}
                keyboardType={CONST.KEYBOARD_TYPE.NUMERIC}
                value={zipCode}
                onChangeText={(val) => {
                    if (error === translateLocal('bankAccount.error.zipCode')) {
                        hideBankAccountErrors();
                    }
                    onFieldChange('zipCode', val);
                }}
                errorText={error === translateLocal('bankAccount.error.zipCode') ? error : ''}
                maxLength={CONST.BANK_ACCOUNT.MAX_LENGTH.ZIP_CODE}
            />
        </View>
    );
};

IdentityForm.propTypes = propTypes;
IdentityForm.defaultProps = defaultProps;
export default withLocalize(IdentityForm);
