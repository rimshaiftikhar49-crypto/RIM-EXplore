'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Zap, Check, X, Star, Shield, Rocket } from 'lucide-react'

const APIPlanPage = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started',
      features: [
        { name: '100 requests/day', included: true },
        { name: 'Basic endpoints', included: true },
        { name: 'Rate limiting: 5 req/sec', included: true },
        { name: 'Community support', included: true },
        { name: 'Advanced endpoints', included: false },
        { name: 'Priority support', included: false },
        { name: 'Custom rate limits', included: false },
        { name: 'Analytics dashboard', included: false }
      ],
      popular: false,
      buttonText: 'Get Started',
      buttonStyle: 'bg-gray-600 hover:bg-gray-700'
    },
    {
      id: 'developer',
      name: 'Developer',
      price: { monthly: 99, yearly: 990 },
      description: 'For serious developers',
      features: [
        { name: '100,000 requests/day', included: true },
        { name: 'All endpoints', included: true },
        { name: 'Rate limiting: 50 req/sec', included: true },
        { name: 'Email support', included: true },
        { name: 'Advanced endpoints', included: true },
        { name: 'WebSocket access', included: true },
        { name: 'Analytics dashboard', included: true },
        { name: 'Priority support', included: false }
      ],
      popular: true,
      buttonText: 'Start Free Trial',
      buttonStyle: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: { monthly: 499, yearly: 4990 },
      description: 'For large-scale applications',
      features: [
        { name: 'Unlimited requests', included: true },
        { name: 'All endpoints', included: true },
        { name: 'Custom rate limits', included: true },
        { name: 'Priority support', included: true },
        { name: 'Advanced endpoints', included: true },
        { name: 'WebSocket access', included: true },
        { name: 'Analytics dashboard', included: true },
        { name: 'SLA guarantee', included: true }
      ],
      popular: false,
      buttonText: 'Contact Sales',
      buttonStyle: 'bg-yellow-600 hover:bg-yellow-700'
    }
  ]

  const features = [
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Low latency API with 99.9% uptime guarantee'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with data encryption'
    },
    {
      icon: Rocket,
      title: 'Easy Integration',
      description: 'RESTful API with comprehensive documentation'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-600">Home</Link>
            <span>/</span>
            <Link href="/developers" className="hover:text-yellow-600">Developers</Link>
            <span>/</span>
            <span className="text-yellow-600">API Plans</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AUR Explorer API Plans</h1>
          <p className="text-xl text-gray-600 mb-8">Choose the perfect plan for your blockchain application</p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-lg p-1 border border-gray-300">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-yellow-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingPeriod === 'yearly'
                  ? 'bg-yellow-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Save 17%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg shadow-lg border-2 relative ${
                plan.popular ? 'border-blue-500' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    ${plan.price[billingPeriod]}
                    <span className="text-lg font-normal text-gray-500">
                      /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </div>
                  {billingPeriod === 'yearly' && plan.price.yearly > 0 && (
                    <div className="text-sm text-green-600">
                      Save ${(plan.price.monthly * 12) - plan.price.yearly}/year
                    </div>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-gray-900' : 'text-gray-500'}`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${plan.buttonStyle}`}>
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose AUR Explorer API?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What's included in the free plan?</h3>
              <p className="text-gray-600">The free plan includes 100 requests per day with access to basic endpoints like blocks, transactions, and account information.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-gray-600">Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Do you offer custom enterprise solutions?</h3>
              <p className="text-gray-600">Yes, we offer custom solutions for enterprises with specific requirements. Contact our sales team for more information.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What's your SLA for API uptime?</h3>
              <p className="text-gray-600">We guarantee 99.9% uptime for paid plans, with 24/7 monitoring and automatic failover systems.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default APIPlanPage


