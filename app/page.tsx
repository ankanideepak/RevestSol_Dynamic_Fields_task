'use client'
import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, FormControlLabel, FormLabel, Radio, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Grid, Box, RadioGroup } from '@material-ui/core';
import { dataField } from './inputfields';
import { useStyles } from './styles';
import { Field, FormData } from './interface';

const SignupForm: React.FC = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState<any>({
  });
  const [renderContent, setRenderContent] = useState<boolean>(false)
  const [errors, setErrors] = useState<Partial<any>>({});

  const populateDefaults = (fields: Field[], obj: any) => {
    const outputObject: any = {};
    fields.forEach(item => {
      outputObject[item.name] = item.defaultValue;
    });
    return outputObject
  }
  useEffect(() => {
    const output = populateDefaults(dataField, formData);
    setFormData(output)
    setRenderContent(true)
  }, [])

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    let { name, value } = event.target;
    if (name === 'Gender') {
      const updatedVal = value === 'Male' ? '1' : value === 'Female' ? '2' : value === 'Others' ? '3' : '1'
      value = updatedVal
    }
    setFormData({
      ...formData,
      [name as string]: value as string,
    });
    setErrors({
      ...errors,
      [name as string]: '',
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let newErrors: Partial<any> = {};
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const isRequired = dataField.filter(item => item.name === key)
        if (isRequired[0]?.required) {
          if (isRequired[0]?.name === 'Email') {
            if (formData[key] === '') {
              newErrors[key] = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(formData[key])) {
              newErrors[key] = 'Email is invalid';
            }
          }
          if (formData[key] === '') {
            newErrors[key] = `${key} is required`
          }
        }
      }
    }
    setErrors(newErrors);
  };

  const renderRadioContent = (val: string) => {
    return val === '1' ? 'Male' : val === '2' ? 'Female' : val === '3' ? 'Others' : 'Male'
  }

  const renderDynamicFields = (item: any) => {
    switch (item.fieldType) {
      case "TEXT":
        return <TextField
          name={item.name}
          label={item.name}
          fullWidth
          margin="normal"
          className={classes.textField}
          value={formData[item.name as keyof FormData]}
          onChange={handleChange}
          error={!!errors[item.name]}
          helperText={errors[item.name]}
        />
        break;
      case "LIST":
        return <>
          <FormControl fullWidth margin="normal" className={classes.textField} error={!!errors[item.name]}>
            <InputLabel id="gender-label">{item.name}</InputLabel>
            <Select
              labelId="gender-label"
              name={item.name}
              value={renderRadioContent(formData[item.name as keyof FormData])}
              onChange={handleChange}
              >
              {item.listOfValues1.map((genderType: string) => (<MenuItem value={genderType} key={genderType}>{genderType}</MenuItem>))}
            </Select>
          </FormControl>
          {errors[item.name] && <div className={classes.textField}>{errors[item.name]}</div>}
        </>
        break;
      case "RADIO":
        return (
          <>
            <FormControl component="fieldset" fullWidth margin="normal">
              <FormLabel component="legend">{item.name}</FormLabel>
              <RadioGroup
                aria-label={item.name}
                name={item.name}
                value={renderRadioContent(formData[item.name as keyof FormData])}
                onChange={handleChange}
                row
              >
                {item.listOfValues1.map((optionType: number) => (<FormControlLabel key={optionType} value={optionType} control={<Radio />} label={optionType} />))}
              </RadioGroup>
            </FormControl>
          </>
        );
      default:
        <div></div>
    }
  }
  return (
    <Grid container className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Signup Form
          </Typography>
          {renderContent &&
            <form onSubmit={handleSubmit}>
              {dataField.map(item => {
                return (
                  <>
                    {renderDynamicFields(item)}
                  </>
                )
              })}
              <Box className={classes.submitButtonContainer}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Box>
            </form>
          }
        </CardContent>
      </Card>
    </Grid>
  );
};

export default SignupForm;
