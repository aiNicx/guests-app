"use client";

import { useState, useEffect } from "react";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export interface FormData {
  title: string;
  description: string;
  content: string;
  icon: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
    website: string;
  };
  instructions: string[];
  tips: string[];
  links: Array<{ title: string; url: string; description: string }>;
  images: string[];
  pricing: {
    price: string;
    currency: string;
    notes: string;
  };
  schedule: {
    openingHours: string;
    availability: string;
    seasonality: string;
  };
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
    directions: string;
  };
  tags: string[];
  priority: number;
  isActive: boolean;
  category: string;
  subcategory: string;
}

const initialFormData: FormData = {
  title: "",
  description: "",
  content: "",
  icon: "",
  contactInfo: {
    phone: "",
    email: "",
    address: "",
    website: "",
  },
  instructions: [],
  tips: [],
  links: [],
  images: [],
  pricing: {
    price: "",
    currency: "EUR",
    notes: "",
  },
  schedule: {
    openingHours: "",
    availability: "",
    seasonality: "",
  },
  location: {
    address: "",
    coordinates: { lat: 0, lng: 0 },
    directions: "",
  },
  tags: [],
  priority: 0,
  isActive: true,
  category: "",
  subcategory: "",
};

export function useFormData(content: any) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Update form data when content changes
  useEffect(() => {
    if (content) {
      setFormData({
        title: content.title || "",
        description: content.description || "",
        content: content.content || "",
        icon: content.icon || "",
        contactInfo: {
          phone: content.contactInfo?.phone || "",
          email: content.contactInfo?.email || "",
          address: content.contactInfo?.address || "",
          website: content.contactInfo?.website || "",
        },
        instructions: content.instructions || [],
        tips: content.tips || [],
        links: (content.links || []).map((link: any) => ({
          title: link.title,
          url: link.url,
          description: link.description || "",
        })),
        images: content.images || [],
        pricing: {
          price: content.pricing?.price || "",
          currency: content.pricing?.currency || "EUR",
          notes: content.pricing?.notes || "",
        },
        schedule: {
          openingHours: content.schedule?.openingHours || "",
          availability: content.schedule?.availability || "",
          seasonality: content.schedule?.seasonality || "",
        },
        location: {
          address: content.location?.address || "",
          coordinates: {
            lat: Number(content.location?.coordinates?.lat) || 0,
            lng: Number(content.location?.coordinates?.lng) || 0,
          },
          directions: content.location?.directions || "",
        },
        tags: content.tags || [],
        priority: content.priority || 0,
        isActive: content.isActive ?? true,
        category: content.category,
        subcategory: content.subcategory,
      });
    }
  }, [content]);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => {
      const newData = { ...prev, ...updates };
      setHasUnsavedChanges(true);
      return newData;
    });
  };

  const updateField = (field: keyof FormData, value: any) => {
    updateFormData({ [field]: value });
  };

  const updateNestedField = (field: string, value: any) => {
    if (field === 'contactInfo.email') {
      updateFormData({
        contactInfo: { ...formData.contactInfo, email: value }
      });
    } else if (field === 'contactInfo.website') {
      updateFormData({
        contactInfo: { ...formData.contactInfo, website: value }
      });
    }
  };

  // Dynamic array management
  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, ""]
    }));
    setHasUnsavedChanges(true);
  };

  const updateInstruction = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.map((item, i) => i === index ? value : item)
    }));
    setHasUnsavedChanges(true);
  };

  const removeInstruction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
    setHasUnsavedChanges(true);
  };

  const addTip = () => {
    setFormData(prev => ({
      ...prev,
      tips: [...prev.tips, ""]
    }));
    setHasUnsavedChanges(true);
  };

  const updateTip = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      tips: prev.tips.map((item, i) => i === index ? value : item)
    }));
    setHasUnsavedChanges(true);
  };

  const removeTip = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tips: prev.tips.filter((_, i) => i !== index)
    }));
    setHasUnsavedChanges(true);
  };

  const addLink = () => {
    setFormData(prev => ({
      ...prev,
      links: [...prev.links, { title: "", url: "", description: "" }]
    }));
    setHasUnsavedChanges(true);
  };

  const updateLink = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
    setHasUnsavedChanges(true);
  };

  const removeLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
    setHasUnsavedChanges(true);
  };

  const markAsSaved = () => {
    setHasUnsavedChanges(false);
  };

  return {
    formData,
    hasUnsavedChanges,
    updateFormData,
    updateField,
    updateNestedField,
    addInstruction,
    updateInstruction,
    removeInstruction,
    addTip,
    updateTip,
    removeTip,
    addLink,
    updateLink,
    removeLink,
    markAsSaved,
  };
}