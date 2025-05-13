import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ClientPortalPage = () => {
  const [clientEmail, setClientEmail] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [contentPreferences, setContentPreferences] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInviteClient = async () => {
    if (!clientEmail) {
      alert("Please enter a client's